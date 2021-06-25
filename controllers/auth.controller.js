import UserModel from '../models/User.model.js';
import error from '../utils/errors.utils.js';
import jwt from 'jsonwebtoken';

const maxAgeCookie = 1 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, {
        expiresIn: maxAgeCookie,
    });
};

export default {
    signUp: async (req, res) => {
        const { pseudo, email, password } = req.body;

        try {
            const user = await UserModel.create({ pseudo, email, password });
            res.status(201).json({ user: user._id });
        } catch (err) {
            const errors = error.signUpErrors(err);
            res.status(400).json({ message : errors });
        }
    },

    signIn: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await UserModel.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeCookie });
            res.status(200).json({ user: user._id });
        } catch (err) {
            if (typeof err === 'object')
                res.status(err.status).json({ message: err.message });
            else res.status(400).json({ err });
        }
    },

    logout: (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    },
};
