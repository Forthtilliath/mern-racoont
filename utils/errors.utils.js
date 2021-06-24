export default {
    /**
     * Retourne un objet erreur simplifié
     * @param {{}} err Objet error généré par Mongoose
     * @returns {{pseudo:String, email:String, password:String}}
     */
    signUpErrors: (err) => {
        let errors = { pseudo: '', email: '', password: '' };

        if (err.hasOwnProperty('errors')) {
            if (err.errors.hasOwnProperty('pseudo')) {
                // errors.pseudo = err.errors.pseudo.message;
                errors.pseudo = 'Le pseudo doit avoir entre 3 et 55 caractères !';
            }
            if (err.errors.hasOwnProperty('email')) {
                // errors.email = err.errors.email.message;
                errors.email = 'Format du courriel incorrect !';
            }
            if (err.errors.hasOwnProperty('password')) {
                // errors.password = err.errors.password.message;
                errors.password = 'Le mot de passe doit avoir au moins 6 caractères !';
            }
        }

        // if (err.message.includes('pseudo')) errors.pseudo = 'Le pseudo doit avoir entre 3 et 55 caractères !';
        // if (err.message.includes('email')) errors.email = 'Format du courriel incorrect !';
        // if (err.message.includes('password')) errors.password = 'Le mot de passe doit avoir au moins 6 caractères !';

        if (err.code === 11000) {
            if (err.keyValue.pseudo) errors.pseudo = 'Ce pseudo est déjà utilisé !';
            if (err.keyValue.email) errors.email = 'Ce courriel est déjà utilisé !';
        }

        return errors;
    },
};
