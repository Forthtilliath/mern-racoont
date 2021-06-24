import express from 'express';
const router = express.Router();

import multer from '../middleware/multer-config.middleware.js';
import sharp from '../middleware/sharp-config.middleware.js';

import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js';
import uploadController from '../controllers/upload.controller.js';

// auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfos);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

// upload
/** 
 * NOTE : Ordre des données
 * Les autres données que le fichier doivent être mise avant le fichier
 * sinon elles ne sont pas envoyées !
 */
router.post('/upload', multer, sharp, uploadController.uploadProfil);

export default router;