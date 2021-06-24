import multer from 'multer';
import File from '../utils/file.utils.js';

const storage = new multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, File.path.profile);
    },
    filename: (req, file, callback) => {
        callback(
            null,
            File.rename(file.originalname, file.mimetype, req.body.id),
        );
    },
});

export default multer({storage:storage}).single(File.postName);
