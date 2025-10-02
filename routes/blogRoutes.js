const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { isAuthenticated, isAuthor } = require('../middlewares/auth');
const { validateBlog } = require('../middlewares/validation');
const multer = require('multer');
const path = require('path');  // Yeh fix kiya

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/', isAuthenticated, upload.single('image'), validateBlog, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', isAuthenticated, isAuthor, upload.single('image'), validateBlog, blogController.updateBlog);
router.delete('/:id', isAuthenticated, isAuthor, blogController.deleteBlog);

module.exports = router;