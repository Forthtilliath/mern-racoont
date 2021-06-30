import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';

export const GET_USER_ERRORS = 'GET_USER_ERRORS';

/**
 * Récupère les données d'un utilisateur à partir de son id
 * @param {String} uid
 * @returns
 */
export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, uid) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}/api/user/upload`, data)
            .then((res) => {
                // TODO Gérer les erreurs en back
                if (res.data.errors) {
                    dispatch({
                        type: GET_USER_ERRORS,
                        payload: res.data.errors,
                    });
                } else {
                    dispatch({ type: GET_USER_ERRORS, payload: '' });
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
                        .then((res) => {
                            dispatch({
                                type: UPLOAD_PICTURE,
                                payload: res.data.picture,
                            });
                        });
                }
            })
            .catch((err) => console.log(err));
    };
};

export const updateBio = (uid, bio) => {
    return (dispatch) => {
        return axios
            .put(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, { bio })
            .then((res) => dispatch({ type: UPDATE_BIO, payload: bio }))
            .catch((err) => console.log(err));
    };
};

export const followUser = (followerId, idToFollow) => {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}/api/user/follow/${followerId}`,
                { idToFollow },
            )
            .then((res) =>
                dispatch({ type: FOLLOW_USER, payload: { idToFollow } }),
            )
            .catch((err) => console.log(err));
    };
};

export const unFollowUser = (followerId, idToUnfollow) => {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}/api/user/unfollow/${followerId}`,
                { idToUnfollow },
            )
            .then((res) =>
                dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } }),
            )
            .catch((err) => console.log(err));
    };
};
