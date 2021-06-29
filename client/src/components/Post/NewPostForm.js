import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils';
import { NavLink } from 'react-router-dom';

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState('');
    const [video, setVideo] = useState('');
    const [file, setFile] = useState('');
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {};

    const handlePost = (e) => {};

    const cancelPost = (e) => {
        setMessage('');
        setPostPicture('');
        setVideo('');
        setFile('');
    };

    const hasContent = () => message || postPicture || video.length > 20;

    useEffect(() => {
        !isEmpty(userData) && setIsLoading(false);
    }, [userData]);

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="data">
                        <p>
                            <span>
                                {userData.following
                                    ? userData.following.length
                                    : 0}
                            </span>
                            &nbsp;Abonnement
                            {userData.following &&
                                userData.following.length > 1 &&
                                's'}
                        </p>
                        <p>
                            <span>
                                {userData.followers
                                    ? userData.followers.length
                                    : 0}
                            </span>
                            &nbsp;Abonné
                            {userData.followers &&
                                userData.followers.length > 1 &&
                                's'}
                        </p>
                    </div>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Quoi de neuf ?"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {hasContent() && (
                            <li className="card-container">
                                <div className="card-left">
                                    <img
                                        src={userData.picture}
                                        alt="user-pic"
                                    />
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>
                                            {timestampParser(Date.now())}
                                        </span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        <img src={postPicture} alt="" />
                                        {video && (
                                            <iframe
                                                src={video}
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        )}
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img
                                            src="./img/icons/picture.svg"
                                            alt="post-img"
                                        />
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={handlePicture}
                                        />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo('')}>
                                        Supprimer vidéo
                                    </button>
                                )}
                            </div>
                            <div className="btn-send">
                                {hasContent() && (
                                    <button
                                        className="cancel"
                                        onClick={cancelPost}
                                    >
                                        Annuler message
                                    </button>
                                )}
                                <button className="send" onClick={handlePost}>
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;
