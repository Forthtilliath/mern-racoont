export default class File {
    /** Nom du champ envoyé par le formulaire */
    static postName = '';
    /** Chemin du fichier enregistré sur le serveur */
    static path = '';
    /** Chemin du fichier pour y accéder par le client */
    static pathClient = '';

    /** Liste des types de fichiers acceptés */
    static MIME_TYPES = {};

    /**
     * Utilisé lors du remplacement du nom temporaire par le nom final.
     * @var filename.from est le suffixe ajouté à l'enregistrement
     * temporaire de l'image sur le serveur. La version temporaire
     * est une copie de l'image envoyée par l'utilisateur.
     * @var filename.to est le chaine qui remplace le suffixe temporaire.
     */
    static filename = {
        from: '_temp',
        to: '',
    };

    constructor() {
        //
    }

    /**
     * Vérifie si le type du fichier à enregistrer est un type accepté
     * @param {String} mimetype
     * @returns {Boolean}
     */
    static checkMime(mimetype) {
        return this.MIME_TYPES.hasOwnProperty(mimetype);
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
        return userId + this.filename.from + '.' + extension;
    }

    /**
     * Renomme le fichier temporaire à partir des valeurs dans File.filename
     * @param {String} filename Nom du fichier temporaire
     * @returns {String} Nom du fichier final
     */
    static rename(filename) {
        return filename.replace(this.filename.from, this.filename.to);
    }

    /**
     * Génère l'url de l'image pour le frontside
     * @param {Request} req
     */
    static getUrl(filename) {
        return this.pathClient + '/' + this.rename(filename);
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
