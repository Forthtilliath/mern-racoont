import UserModel from '../models/User.model.js';
import PostModel from '../models/Post.model.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export default {
    /**
     * Récupère tous les posts
     */
    readPost: (req, res) => {
        PostModel.find((err, docs) => {
            if (!err) res.status(200).json(docs);
            else res.status(400).json({ error: 'Error to get data : ' + err });
        }).sort({ createdAt: -1 });
    },

    /**
     * Crée un nouveau post
     * @param {{body:{posterId:String,message:String,video:String}}} req
     * [posterId] Id de l'utilisateur qui crée le post.
     * [message] Contenu du message.
     * [video] Lien de la video lié au post
     */
    createPost: async (req, res) => {
        const newPost = new PostModel({
            ...req.body,
            likers: [],
            comments: [],
        });
        try {
            const post = await newPost.save();
            return res.status(201).json(post);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    /**
     * Modifie un post
     * @param {{body:{message:String}}} req [message] Contient le nouveau
     * contenu du message.
     */
    updatePost: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        PostModel.findByIdAndUpdate(
            req.params.id,
            { message: req.body.message },
            { new: true },
            (err, docs) => {
                if (!err) return res.status(200).json(docs);
                else
                    return res
                        .status(400)
                        .json({ error: 'Update error : ' + err });
            },
        );
    },

    /**
     * Supprime un post
     */
    deletePost: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
            if (!err) return res.status(200).json(docs);
            else
                return res.status(400).json({ error: 'Delete error : ' + err });
        });
    },

    /**
     * Like un post
     * @param {{body:{id:String}}} req [id] Contient l'id de l'utilisateur qui
     * veut liker le post.
     */
    likePost: async (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        try {
            let message = {
                liker: '', // Celui qui like le poste
                like: '', // Post qui est like
            };
            await PostModel.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { likers: req.body.id } },
                { new: true },
                (error, docs) => {
                    if (error) return res.status(500).json(error);
                    message.liker = docs;
                },
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                { $addToSet: { likes: req.params.id } },
                { new: true },
                (err, docs) => {
                    if (err) return res.status(500).json(err);
                    message.like = docs;
                },
            ).select('-password');
            return res.status(201).json(message);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    /**
     * Unlike un post
     * @param {{body:{id:String}}} req
     * [id] Contient l'id de l'utilisateur qui ne veut plus liker le post.
     */
    unlikePost: async (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        try {
            let message = {
                liker: '', // Celui qui like le poste
                like: '', // Post qui est like
            };
            await PostModel.findByIdAndUpdate(
                req.params.id,
                { $pull: { likers: req.body.id } },
                { new: true },
                (err, docs) => {
                    if (err) return res.status(500).json(err);
                    message.liker = docs;
                },
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                { $pull: { likes: req.params.id } },
                { new: true },
                (err, docs) => {
                    if (err) return res.status(500).json(err);
                    message.like = docs;
                },
            ).select('-password');
            return res.status(201).json(message);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    /**
     * Commente un post
     * @param {{ body: {
     *      commenterId: String, //* Id du commentateur
     *      commenterPseudo: String, //* Pseudo du commentateur
     *      text: String //* Message du commentateur
     * } }} req
     */
    commentPost: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        try {
            PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        comments: {
                            ...req.body,
                            timestamp: new Date().getTime(),
                        },
                    },
                },
                { new: true },
                (err, docs) => {
                    if (err) return res.status(400).json(err);
                    return res.status(200).json(docs);
                },
            );
        } catch (err) {
            res.status(400).json(err);
        }
    },

    editCommentPost: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        try {
            PostModel.findById(req.params.id, (err, docs) => {
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId),
                );

                if (!theComment)
                    return res.status(404).json({ error: 'Comment not found' });

                theComment.text = req.body.text;

                docs.save((error) => {
                    if (!error) return res.status(200).json(docs);
                    return res.status(500).json(error);
                });
            });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteCommentPost: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'ID unknown : ' + req.params.id });

        try {
            PostModel.findByIdAndUpdate(
                req.params.id,
                { $pull: { comments: { _id: req.body.commentId } } },
                { new: true },
                (error, docs) => {
                    if (!error) return res.status(200).json(docs);
                    return res.status(400).json(error);
                },
            );
        } catch (err) {
            res.status(400).json(err);
        }
    },
};
