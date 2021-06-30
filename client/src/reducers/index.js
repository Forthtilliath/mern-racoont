import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import errorReducer from './error.reducer';

const allReducers = combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer,
});

export default allReducers;
