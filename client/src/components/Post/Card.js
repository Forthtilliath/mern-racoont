import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import FollowHandler from '../Profile/FollowHandler';
import { updatePost } from '../../actions/post.actions';
import LikeButton from './LikeButton';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState('');
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <li className="card-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData
                                    .map((user) =>
                                        user._id === post.posterId
                                            ? user.picture
                                            : '',
                                    )
                                    .join('')
                            }
                            alt="poster-pic"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map((user) =>
                                            user._id === post.posterId
                                                ? user.pseudo
                                                : '',
                                        )}
                                </h3>
                                {post.posterId !== userData._id && (
                                    <FollowHandler
                                        idToFollow={post.posterId}
                                        type={'card'}
                                    />
                                )}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {!isUpdated ? (
                            <p>{post.message}</p>
                        ) : (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) =>
                                        setTextUpdate(e.target.value)
                                    }
                                />
                                <div className="button-container">
                                    <div className="btn" onClick={updateItem}>
                                        Valider modification
                                    </div>
                                </div>
                            </div>
                        )}
                        {post.picture && (
                            <img
                                src={post.picture}
                                alt="card-pic"
                                className="card-pic"
                            />
                        )}
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            ></iframe>
                        )}
                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img
                                        src="./img/icons/edit.svg"
                                        alt="modifier"
                                    />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img
                                    onClick={() =>
                                        setShowComments(!showComments)
                                    }
                                    src="./img/icons/message1.svg"
                                    alt="comment"
                                />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="partager" />
                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
