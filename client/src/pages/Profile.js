import React, { useContext } from 'react';
import Log from '../components/Log/Log';
import UidContext from '../components/AppContext';

const Profile = () => {
    const uid = useContext(UidContext);
    return (
        <div className="profil-page">
            {uid ? (
                <h1>UPDATE PAGE</h1>
            ) : (
                <div className="log-container">
                    <Log signIn={true} />
                    <div className="img-container">
                        <img src="./img/log.svg" alt="log" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
