import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import File from '../utils/file.utils.js';

const sizeMax = 500;
const qualityMax = 50;

const avatarSettings = { sizeMax: 500, qualityMax: 50 };
const postSettings = { sizeMax: 2000, qualityMax: 50 };

// export default async (req, res, next) => {
//     if (req.file) {
//         await sharp(req.file.path)
//             .resize(sizeMax)
//             .jpeg({ quality: qualityMax })
//             .toFile(
//                 path.resolve(
//                     req.file.destination,
//                     '',
//                     File.rename(req.file.filename),
//                 ),
//             );
//         fs.unlinkSync(req.file.path);

//         next();
//     } else {
//         res.status(500).json({
//             error: "Erreur lors de l'enregistrement de l'image.",
//         });
//     }
// };

const compress = (file, settings) => {
    return sharp(file.path)
        .resize(settings.sizeMax)
        .jpeg({ quality: settings.qualityMax })
        .toFile(
            path.resolve(
                file.destination,
                '',
                File.rename(file.filename),
            ),
        );
}

export default {
    avatar: async (req, res, next) => {
        if (req.file) {
            await compress(req.file, avatarSettings);
            fs.unlinkSync(req.file.path);

            next();
        } else {
            res.status(500).json({
                error: "Erreur lors de l'enregistrement de l'image.",
            });
        }
    },
    post: async (req, res, next) => {
        if (req.file) {
            await compress(req.file, postSettings);
            fs.unlinkSync(req.file.path);

            next();
        } else {
            res.status(500).json({
                error: "Erreur lors de l'enregistrement de l'image.",
            });
        }
    },
};
