import axios from 'axios';

export const GET_USER = 'GET_USER';

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
