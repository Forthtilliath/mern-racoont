import UserModel from '../models/User.model.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export default {
    /**
     * Retourne tous les utilisateurs
     * @returns {UserModel[]} Tableau d'objets User
     */
    getAllUsers: async (req, res) => {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users);
    },

    /**
     * Retourne les infos d'un utilisateur à partir d'un identifiant
     * @param {String} id Identifiant d'un utilisateur
     * @returns {UserModel} Objet de User
     */
    userInfos: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        UserModel.findById(req.params.id, (err, docs) => {
            if (docs) res.status(200).json(docs);
            else
                res.status(400).json({
                    message: '!!!ID unknown : ' + (err ? err : req.params.id),
                });
        }).select('-password');
    },

    /**
     * Met à jour la biographie d'un utilisateur
     * @param {String} id Identifiant d'un utilisateur
     * @param {String} bio Nouvelle biographie
     * @returns {UserModel} Objet de User
     */
    updateUser: async (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        try {
            await UserModel.findByIdAndUpdate(
                req.params.id,
                { bio: req.body.bio },
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                },
                (err, docs) => {
                    if (!err) res.status(200).json(docs);
                    return res.status(500).json({ message: err });
                },
            ).select('-password');
        } catch (e) {
            return res.status(500).json({ message: err });
        }
    },

    /**
     * Supprime un utilisateur
     * @param {String} id Identifiant d'un utilisateur
     * @returns {{message:String}}
     */
    deleteUser: async (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        try {
            await UserModel.findByIdAndRemove(req.params.id).exec();
            res.status(200).json({ message: 'Successfully delete.' });
        } catch (e) {
            return res.status(500).json({ message: err });
        }
    },

    /**
     * Suit un nouvel utilisateur
     * @param {String} id Identifiant d'un utilisateur
     * @param {String} idToFollow Identifiant de l'utilisation à suivre
     * @returns {{message: {follower:UserModel, followed:UserModel}}} Renvoit un objet contenant l'objet du suiveur et du suivi
     */
    follow: async (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });
        if (!ObjectId.isValid(req.body.idToFollow))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.body.idToFollow });

        try {
            let message = {
                follower: '', // Celui qui suit
                followed: '', // Celui qui est suivit !
            };
            await UserModel.findByIdAndUpdate(
                req.params.id,
                // addToSet: Ajoute seulement si pas déjà dans le tableau
                { $addToSet: { following: req.body.idToFollow } },
                { new: true, upsert: true },
                (err, docs) => {
                    if (err) return res.status(500).json({ message: err });
                    message.follower = docs;
                },
            ).select('-password');
            await UserModel.findByIdAndUpdate(
                req.body.idToFollow,
                { $addToSet: { followers: req.params.id } },
                { new: true, upsert: true },
                (err, docs) => {
                    if (err) return res.status(500).json({ message: err });
                    message.followed = docs;
                },
            ).select('-password');
            res.status(201).json(message);
        } catch (e) {
            return res.status(500).json({ message: err });
        }
    },

    /**
     * Annule le suivi d'un utilisateur
     * @param {String} id Identifiant d'un utilisateur
     * @param {String} idToUnfollow Identifiant de l'utilisation à suivre
     * @returns {{message: {unfollower:UserModel, unfollowed:UserModel}}} Renvoit un objet contenant l'objet du non-suiveur et du non-suivi
     */
    unfollow: async (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });
        if (!ObjectId.isValid(req.body.idToUnfollow))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.body.idToUnfollow });

        try {
            let message = {
                unfollower: '', // Celui qui ne suit plus
                unfollowed: '', // Celui qui n'est plus suivit !
            };
            await UserModel.findByIdAndUpdate(
                req.params.id,
                { $pull: { following: req.body.idToUnfollow } },
                { new: true, upsert: true },
                (err, docs) => {
                    if (err) return res.status(500).json({ message: err });
                    message.unfollower = docs;
                },
            );
            await UserModel.findByIdAndUpdate(
                req.body.idToUnfollow,
                { $pull: { followers: req.params.id } },
                { new: true, upsert: true },
                (err, docs) => {
                    if (err) return res.status(500).json({ message: err });
                    message.unfollowed = docs;
                },
            );
            res.status(201).json(message);
        } catch (e) {
            return res.status(500).json({ message: err });
        }
    },
};
