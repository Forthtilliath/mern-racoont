import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import File from '../utils/file.utils.js';

// prettier-ignore
const avatarSettings = {
    sizeMax   : parseInt(process.env.UPLOAD_IMAGE_PROFILE_SIZE),   // 180
    qualityMax: parseInt(process.env.UPLOAD_IMAGE_PROFILE_COMP),   // 50
};
// prettier-ignore
const postSettings = {
    sizeMax   : parseInt(process.env.UPLOAD_IMAGE_POST_SIZE),   // 2000
    qualityMax: parseInt(process.env.UPLOAD_IMAGE_POST_COMP),   // 50
};

const compress = (file, settings) => {
    return sharp(file.path)
        .resize(settings.sizeMax)
        .jpeg({ quality: settings.qualityMax })
        .toFile(path.resolve(file.destination, '', File.rename(file.filename)));
};

export default {
    avatar: (req, res, next) => {
        try {
            if (req.file) {
                compress(req.file, avatarSettings).then(() =>
                    fs.unlinkSync(req.file.path),
                );

                next();
            } else {
                res.status(500).json({
                    error: "Erreur lors de l'enregistrement de l'image.",
                });
            }
        } catch (e) {
            console.log('Error', e);
        }
    },
    post: async (req, res, next) => {
        if (req.file) {
            await compress(req.file, postSettings);
            fs.unlinkSync(req.file.path);

            next();
        } else {
            // res.status(500).json({
            //     error: "Erreur lors de l'enregistrement de l'image.",
            // });

            next();
        }
    },
};
