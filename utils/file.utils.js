import UserModel from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export default class File {
    static MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png',
    };

    static postName = 'profile'; // Nom du champ envoyé en post

    static path = {
        profile: './client/public/uploads/profile',
    };

    // Pour le replace du nom
    static filename = {
        from: '_temp',
        to: ''
    }

    constructor() {
        //
    }

    /**
     * Rename an image file with timestamp
     * @param {String} originalname
     */
    static rename(originalname, mimetype, userId) {

        const name = originalname
            .replace(/ /g, '_')
            .substring(0, originalname.lastIndexOf('.'));
        const extension = this.MIME_TYPES[mimetype];

        const newName = userId + '_temp.' + extension;
        return newName;
    }

    /**
     * Generate the url for an image
     * @param {*} req
     */
    static getUrl(req) {
        return `${req.protocol}://${req.get('host')}/${this.path}/r_${
            req.file.filename
        }`;
    }

    // static remove(id) {
    //     Sauce.findById(id).then((sauce) => {
    //         const filename = sauce.imageUrl.split(`/${this.path}/`)[1];
    //         fs.unlinkSync(`${this.path}/${filename}`, (err) => {
    //             if (err) throw 'Image non trouvée !';
    //             console.log('File deleted!');
    //         });
    //     });
    // }
}
