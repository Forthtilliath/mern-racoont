import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';

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
                return axios
                    .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
                    .then((res) => {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
                    });
            })
            .catch((err) => console.log(err));
    };
};
