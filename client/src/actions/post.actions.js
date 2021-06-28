import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

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
