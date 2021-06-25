import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

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
                if (error.response.status === 401) {
                    emailError.textContent = error.response.data.message;
                    passwordError.textContent = error.response.data.message;
                } else {
                    console.log(error);
                }
            });
    };

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required={true}
            />
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
                required={true}
            />
            <div className="password error"></div>
            <br />
            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default SignInForm;
