import { GET_USER } from '../actions/user.actions';

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            console.log('payload',action.payload);
            return action.payload;
        default:
            return state;
    }
}
