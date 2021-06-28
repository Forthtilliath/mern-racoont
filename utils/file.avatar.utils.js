import File from './file.utils.js';

export default class FileAvatar extends File {
    /** Nom du champ envoyé par le formulaire */
    static postName = 'file';
    /** Chemin du fichier enregistré sur le serveur */
    static path = './client/public/uploads/profile';
    /** Chemin du fichier pour y accéder par le client */
    static pathClient = './uploads/profile';

    /** Liste des types de fichiers acceptés */
    static MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'jpg',
    };

    constructor() {
        //
    }
}