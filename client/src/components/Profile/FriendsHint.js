import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import FollowHandler from './FollowHandler';

const FriendsHint = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsHint, setFriendsHint] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const notFriendList = React.useCallback(() => {
        let arr = usersData
            .filter(
                (user) =>
                    user._id !== userData._id &&
                    !userData.following.includes(user._id),
            )
            .sort(() => 0.5 - Math.random());

        if( arr.length > 10 ) arr.length = 10;
        setFriendsHint(arr);
    }, [usersData, userData]);

    useEffect(() => {
        if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [playOnce, usersData, userData, notFriendList]);

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className="icons">
                    <div className="fas fa-spinner fa-pulse"></div>
                </div>
            ) : (
                <ul>
                    {friendsHint &&
                        friendsHint.map((user) => (
                            <li className="user-hint" key={user._id}>
                                <img src={user.picture} alt="user-pic" />
                                <p>{user.pseudo}</p>
                                <FollowHandler
                                    idToFollow={user._id}
                                    type={'suggestion'}
                                />
                            </li>
                        ))}
                    {friendsHint && friendsHint.length === 0 && (
                        <li>Aucune personne à suivre.</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default FriendsHint;
