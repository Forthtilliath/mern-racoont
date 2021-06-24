import express from 'express';
const router = express.Router();

import multer from '../middleware/multer-config.middleware.js';
import sharp from '../middleware/sharp-config.middleware.js';

import postController from '../controllers/post.controller.js';

router.get('/', postController.readPost);
router.post('/', multer.post, sharp.post, postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like/:id', postController.likePost);
router.patch('/unlike/:id', postController.unlikePost);

// comments
router.patch('/comment/:id', postController.commentPost);
router.patch('/comment-edit/:id', postController.editCommentPost);
router.patch('/comment-delete/:id', postController.deleteCommentPost);

export default router;
