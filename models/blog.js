const pool = require('../config/db');

const Blog = {
  create: (blogData, callback) => {
    const query = 'INSERT INTO blogs (title, content, authorId, imageUrl) VALUES (?, ?, ?, ?)';
    pool.query(query, [blogData.title, blogData.content, blogData.authorId, blogData.imageUrl], callback);
  },
  findAll: (callback) => {
    const query = 'SELECT * FROM blogs';
    pool.query(query, callback);
  },
  findById: (id, callback) => {
    const query = 'SELECT * FROM blogs WHERE id = ?';
    pool.query(query, [id], callback);
  },
  update: (id, blogData, callback) => {
    const query = 'UPDATE blogs SET title = ?, content = ?, imageUrl = ? WHERE id = ?';
    pool.query(query, [blogData.title, blogData.content, blogData.imageUrl, id], callback);
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM blogs WHERE id = ?';
    pool.query(query, [id], callback);
  }
};

module.exports = Blog;