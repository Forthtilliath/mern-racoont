import React, { useContext } from 'react';
import Log from '../components/Log/Log';
import UidContext from '../components/AppContext';
import UpdateProfile from '../components/Profile/UpdateProfile';
import LeftNav from '../components/LeftNav';

const Profile = () => {
    const uid = useContext(UidContext);
    return (
        <div className="profil-page">
            <LeftNav />
            {uid ? (
                <UpdateProfile />
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
