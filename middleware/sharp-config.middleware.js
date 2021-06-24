import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const sizeMax = 500;
const qualityMax = 50;

export default async (req, _res, next) => {
    if (req.file) {
        await sharp(req.file.path)
            .resize(sizeMax)
            .jpeg({ quality: qualityMax })
            .toFile(
                path.resolve(
                    req.file.destination,
                    '',
                    req.file.filename.replace('_temp', ''),
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
