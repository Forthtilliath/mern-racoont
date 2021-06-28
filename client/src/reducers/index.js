import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';

const allReducers = combineReducers({
    userReducer,
    usersReducer,
    postReducer
});

export default allReducers;
