const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) {
      console.error('Register Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'User registered' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error('Login Query Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt Error:', err);
        return res.status(500).json({ message: 'Internal error' });
      }
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      req.session.userId = user.id;
      res.json({ message: 'Logged in', user: { id: user.id, email: user.email } });
    });
  });
};