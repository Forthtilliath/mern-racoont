import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

export default {
    /**
     * Vérifie le token de l'utilisateur
     */
    checkUser: (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    res.cookie('jwt', '', { maxAge: 1 });
                    next();
                } else {
                    let user = await UserModel.findById(decodedToken.id).select('-password');
                    res.locals.user = user;
                    next();
                }
            });
        } else {
            res.locals.user = null;
            next();
        }
    },

    requireAuth: (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('User connected:', decodedToken.id);
                    next();
                }
            });
        } else {
            console.log('No token');
        }
    },
};
