const Blog = require('../models/blog');

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const isAuthor = (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.session.userId;
  Blog.findById(blogId, (err, results) => {
    if (err) {
      console.error('isAuthor Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) return res.status(404).json({ message: 'Blog not found' });
    if (results[0].authorId !== userId) return res.status(403).json({ message: 'Not authorized' });
    next();
  });
};

module.exports = { isAuthenticated, isAuthor };