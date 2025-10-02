const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  next();
};

const validateBlog = (req, res, next) => {
  if (!req.body) return res.status(400).json({ message: 'Request body missing' });
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Missing title or content' });
  }
  next();
};

module.exports = { validateRegister, validateLogin, validateBlog };