const Blog = require('../models/blog');

exports.createBlog = (req, res) => {
  const blogData = {
    title: req.body.title,
    content: req.body.content,
    authorId: req.session.userId,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null
  };
  Blog.create(blogData, (err, result) => {
    if (err) {
      console.error('Create Blog Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Blog created', blogId: result.insertId });
  });
};

exports.getAllBlogs = (req, res) => {
  Blog.findAll((err, results) => {
    if (err) {
      console.error('Get All Blogs Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
};

exports.getBlogById = (req, res) => {
  Blog.findById(req.params.id, (err, results) => {
    if (err) {
      console.error('Get Blog By Id Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) return res.status(404).json({ message: 'Blog not found' });
    res.json(results[0]);
  });
};

exports.updateBlog = (req, res) => {
  const blogData = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
  };
  Blog.update(req.params.id, blogData, (err, result) => {
    if (err) {
      console.error('Update Blog Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'Blog updated' });
  });
};

exports.deleteBlog = (req, res) => {
  Blog.delete(req.params.id, (err, result) => {
    if (err) {
      console.error('Delete Blog Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'Blog deleted' });
  });
};