import UserModel from '../models/User.model.js';
import File from '../utils/file.utils.js';

export default {
    uploadProfil: async (req, res) => {
        if (req.file.filename) {
            res.status(200).json({message: "L'avatar a été correctement mis à jour."});
        } else {
            res.status(500).json({error: "Une erreur est survenue lors du processus."})
        }
    },
};
