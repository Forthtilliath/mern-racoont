import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import allPostsReducer from './allPosts.reducer';
import errorReducer from './error.reducer';
import trendingReducer from './trending.reducer';

const allReducers = combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    allPostsReducer,
    errorReducer,
    trendingReducer,
});

export default allReducers;
