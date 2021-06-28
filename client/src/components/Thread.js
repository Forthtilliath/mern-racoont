import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);

    return (
        <div className="thred-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => <Card post={post} key={post._id} />)}
            </ul>
        </div>
    );
};

export default Thread;