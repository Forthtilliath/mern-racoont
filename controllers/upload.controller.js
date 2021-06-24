import UserModel from '../models/User.model.js';
import FileAvatar from '../utils/file.avatar.utils.js';

export default {
    uploadProfile: async (req, res) => {
        if (req.file.filename) {
            try {
                console.log("userid",req.body.userId);
                console.log("file",FileAvatar.getUrl(req.file.filename));
                await UserModel.findByIdAndUpdate(
                    req.body.userId,
                    { picture: FileAvatar.getUrl(req.file.filename) },
                    { new: true, upsert: true, setDefaultsOnInsert: true },
                    (err, docs) => {
                        if (!err) return res.status(200).json(docs);
                        else return res.status(500).json(err);
                    },
                ).select('-password');
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            res.status(500).json({
                error: 'Une erreur est survenue lors du processus.',
            });
        }
    },
};
