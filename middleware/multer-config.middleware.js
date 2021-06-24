import multer from 'multer';
import FileAvatar from '../utils/file.avatar.utils.js';
import FilePost from '../utils/file.post.utils.js';

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

const post = {
    fileFilter: (_req, file, callback) => {
        // Si le mime du fichier ne correspond pas à l'un attendu
        if (!FilePost.checkMime(file.mimetype)) {
            return callback(null, false);
        }
        callback(null, true);
    },

    storage: new multer.diskStorage({
        destination: (_req, _file, callback) => {
            callback(null, FilePost.path);
        },
        filename: (req, file, callback) => {
            callback(
                null,
                FilePost.nameForTemp(req.body.posterId, file.mimetype),
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

    /** Multer pour les posts */
    post: multer({
        fileFilter: post.fileFilter,
        storage: post.storage,
    }).single(FilePost.postName),
};
