import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const getPosts = (nb) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/post/`)
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data.slice(0, nb) });
            })
            .catch((err) => console.log(err));
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
