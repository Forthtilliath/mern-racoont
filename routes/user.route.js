import express from 'express';
const router = express.Router();

import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js';

// auth
router.post('/register', authController.signUp);

// user
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);

export default router;
