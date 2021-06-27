import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UidContext from './AppContext';
import Logout from './Log/Logout';

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    console.log('uid', uid);
    console.log('userData', userData);

    return (
        <nav>
            <div className="nav-container">
                <NavLink exact to="/">
                    <div className="logo">
                        <img src="./img/icon.png" alt="logo" />
                        <h3>Racoont</h3>
                    </div>
                </NavLink>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                {/* <h5>Bienvenue {userData.pseudo}</h5> */}
                                <h5>Bienvenue </h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/profil">
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
