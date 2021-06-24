import UserModel from '../models/User.model.js';
import File from '../utils/file.utils.js';

export default {
    uploadProfil: async (req, res) => {
        if (req.file.filename) {
            try {
                await UserModel.findByIdAndUpdate(
                    req.body.userId,
                    {
                        picture:
                            File.pathClient.profile +
                            File.rename(req.file.filename),
                    },
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
