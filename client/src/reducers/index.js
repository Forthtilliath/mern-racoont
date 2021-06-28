import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';

const allReducers = combineReducers({
    userReducer,
    usersReducer,
});

export default allReducers;
