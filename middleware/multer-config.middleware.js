import multer from 'multer';
import FileAvatar from '../utils/file.avatar.utils.js';

const avatar = {
    fileFilter: (_req, file, callback) => {
        // Si le mime du fichier ne correspond pas à l'un attendu
        if (!FileAvatar.checkMime(file.mimetype)) {
            return callback(null, false);
        }
        callback(null, true);
    },

    storage: new multer.diskStorage({
        destination: (_req, _file, callback) => {
            callback(null, FileAvatar.path);
        },
        filename: (req, file, callback) => {
            callback(
                null,
                FileAvatar.nameForTemp(req.body.userId, file.mimetype),
            );
        },
    }),
};

export default {
    /** Multer pour les avatars */
    avatar: multer({
        fileFilter: avatar.fileFilter,
        storage: avatar.storage,
    }).single(FileAvatar.postName),
};
