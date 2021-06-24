import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import File from '../utils/file.utils.js';

const sizeMax = 500;
const qualityMax = 50;

export default async (req, res, next) => {
    if (req.file) {
        await sharp(req.file.path)
            .resize(sizeMax)
            .jpeg({ quality: qualityMax })
            .toFile(
                path.resolve(
                    req.file.destination,
                    '',
                    File.rename(req.file.filename),
                ),
            );
        fs.unlinkSync(req.file.path);

        next();
    } else {
        res.status(500).json({
            error: "Erreur lors de l'enregistrement de l'avatar",
        });
    }
};
