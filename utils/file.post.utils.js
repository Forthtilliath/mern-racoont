import File from './file.utils.js';

export default class FilePost extends File {
    /** Nom du champ envoyé par le formulaire */
    static postName = 'image';
    /** Chemin du fichier enregistré sur le serveur */
    static path = './client/public/uploads/posts';
    /** Chemin du fichier pour y accéder par le client */
    static pathClient = './uploads/posts';

    /** Liste des types de fichiers acceptés */
    static MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'jpg',
    };

    constructor() {
        //
    }

    /**
     * Renomme le fichier envoyé
     * @param {String} userId Id de l'utilisateur. Chaque id étant unique
     * et chaque utilisateur ne pouvant avoir qu'un seul avatar, avoir le
     * fichier avatar ayant comme nom l'id de l'utilisateur est parfait.
     * @param {String} mimetype Type du fichier. Permet de remplacer
     * l'extension du fichier par celle que l'on souhaite (jpeg par jpg
     * par exemple)
     */
    static nameForTemp(userId, mimetype) {
        const extension = this.MIME_TYPES[mimetype];
        return userId + '_' + Date.now() + this.filename.from + '.' + extension;
    }
}
