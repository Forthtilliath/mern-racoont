import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Log = (props) => {
    const [signUpModal, setsignUpModal] = useState(props.signIn);

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        onClick={() => setsignUpModal(true)}
                        id="register"
                        className={signUpModal ? 'active-btn' : ''}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={() => setsignUpModal(false)}
                        id="login"
                        className={signUpModal ? '' : 'active-btn'}
                    >
                        Se connecter
                    </li>
                </ul>
                {signUpModal && <SignUpForm />}
                {!signUpModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;
