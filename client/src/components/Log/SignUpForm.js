import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const $ = document.querySelector.bind(document);

    const checkInput = (name) => {
        if ($('#' + name).value === '') {
            $(`.${name}.error`).textContent = 'Veuillez remplir ce champ';
            return false;
        }
        $(`.${name}.error`).textContent = '';
        return true;
    };

    const checkInputs = (...names) => {
        return names.map((name) => checkInput(name)).every((name) => name);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        $('#terms');
        // $('#pseudo').value = "yo";

        $('.password-conf.error').textContent = '';
        if (password !== controlPassword)
            $('.password-conf.error').textContent =
                'Les mots de passe ne correspondent pas';

        let checks = checkInputs('pseudo', 'email', 'password');

        $('.terms.error').textContent = '';
        if (!$('#terms').checked)
            $('.terms.error').textContent =
                'Veuillez valider les conditions générales';

        if (checks && password === controlPassword && $('#terms').checked) {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/user/register`,
                withCredentials: true,
                data: {
                    pseudo,
                    email,
                    password,
                },
            })
                .then((res) => {
                    // Si la création de compte s'est bien déroulé
                    // on connecte automatiquement l'utilisateur à ce compte
                    // puis on le redirige vers la page d'accueil
                    if (res.data.user) {
                        axios({
                            method: 'post',
                            url: `${process.env.REACT_APP_API_URL}/api/user/login`,
                            withCredentials: true,
                            data: {
                                email,
                                password,
                            },
                        })
                            .then((res) => {
                                if (res.data.user) {
                                    window.location = '/';
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        const messages = error.response.data.message;
                        $('.pseudo.error').textContent = messages.pseudo;
                        $('.email.error').textContent = messages.email;
                        $('.password.error').textContent = messages.password;
                    } else {
                        console.log(error);
                    }
                });
        }
    };

    return (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
            />
            <br />
            <div className="pseudo error"></div>
            <br />

            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <br />
            <div className="email error"></div>
            <br />

            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <br />
            <div className="password error"></div>
            <br />

            <label htmlFor="password-conf">Confirmer le mot de passe</label>
            <br />
            <input
                type="password"
                name="password-conf"
                id="password-conf"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
            />
            <br />
            <div className="password-conf error"></div>
            <br />
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">
                J'accepte les&nbsp;
                <a href="/" target="_blank" rel="noopener norefferer">
                    conditions générales
                </a>
            </label>
            <div className="terms error"></div>
            <br />

            <input type="submit" value="Valider l'inscription" />
        </form>
    );
};

export default SignUpForm;
