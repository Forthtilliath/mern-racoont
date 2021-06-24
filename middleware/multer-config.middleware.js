import multer from 'multer';
import File from '../utils/file.utils.js';

const fileFilter = (_req, file, callback) => {
    // Si le mime du fichier ne correspond pas à l'un attendu
    if (!File.checkMime(file.mimetype)) {
        return callback(null, false);
    }
    callback(null, true);
};

const storage = new multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, File.path);
    },
    filename: (req, file, callback) => {
        callback(null, File.nameForTemp(req.body.userId, file.mimetype));
    },
});

export default multer({ fileFilter: fileFilter, storage: storage }).single(
    File.postName,
);
