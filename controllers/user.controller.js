import UserModel from '../models/user.model.js';
import mongoose from 'mongoose';

const funcs = {
    getAllUsers: async (req, res) => {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users);
    },
    userInfo: (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('ID unknown : ' + req.params.id);

        UserModel.findById(req.params.id, (err, docs) => {
            console.log('resultats:', err, docs);
            if (docs) res.status(200).send(docs);
            else if(err) res.status(400).send('!!!ID unknown : ' + err);
            else res.status(400).send('!!!ID unknown : ' + req.params.id);
        }).select('-password');
    },
};

export default funcs;
