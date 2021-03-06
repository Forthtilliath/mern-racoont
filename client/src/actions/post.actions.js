import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

// comments
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Trends
export const GET_TRENDS = 'GET_TRENDS';

// errors
export const GET_POST_ERRORS = 'GET_POST_ERRORS';

export const getPosts = (nb) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/post/`)
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data.slice(0, nb) });
                dispatch({ type: GET_ALL_POSTS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

// TODO Mettre les erreurs en place en back
export const addPost = (data) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}/api/post`, data)
            .then((res) => {
                if (res.data.errors) {
                    dispatch({
                        type: GET_POST_ERRORS,
                        payload: res.data.errors,
                    });
                } else {
                    dispatch({ type: GET_POST_ERRORS, payload: '' });
                }
            });
    };
};

export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}/api/post/like/${postId}`, {
                id: userId,
            })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}/api/post/unlike/${postId}`,
                {
                    id: userId,
                },
            )
            .then((res) => {
                dispatch({ type: UNLIKE_POST, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios
            .put(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, {
                message,
            })
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: { message, postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const deletetePost = (postId) => {
    return (dispatch) => {
        return axios
            .delete(`${process.env.REACT_APP_API_URL}/api/post/${postId}`)
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}/api/post/comment/${postId}`,
                {
                    commenterId,
                    text,
                    commenterPseudo,
                },
            )
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}/api/post/comment-edit/${postId}`,
                {
                    commentId,
                    text,
                },
            )
            .then((res) => {
                dispatch({
                    type: EDIT_COMMENT,
                    payload: { postId, commentId, text },
                });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}/api/post/comment-delete/${postId}`,
                { commentId },
            )
            .then((res) => {
                dispatch({
                    type: DELETE_COMMENT,
                    payload: { postId, commentId },
                });
            })
            .catch((err) => console.log(err));
    };
};

export const getTrends = (sortedArray) => {
    return (dispatch) => dispatch({ type: GET_TRENDS, payload: sortedArray });
};
