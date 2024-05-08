const express = require('express');
// const Blog = require('./models/blog');
// const blogController = require('../controller/blogContoller')
const BlogController = require('../controler/BlogController');

const router = express.Router();

// router.get('/' , blogController.blog_index);
router.get('/' , BlogController.blog_index);
router.post('/', BlogController.blog_create_post);
router.get('/create' , BlogController.blog_create_get) ;
router.get('/:id',BlogController.blog_details);
router.delete('/:id',BlogController.blog_delete);



module.exports = router;