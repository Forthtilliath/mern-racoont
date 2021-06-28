import { GET_POSTS, LIKE_POST, UNLIKE_POST } from '../actions/post.actions';

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                return post.id === action.payload.postId
                    ? {
                          ...post,
                          likers: [action.payload.userId, ...post.likers],
                      }
                    : post;
            });
        case UNLIKE_POST:
            return state.map((post) => {
                return post.id === action.payload.postId
                    ? {
                          ...post,
                          likers: post.likers.filter(id => id !== action.payload.userId)
                      }
                    : post;
            });
        default:
            return state;
    }
}
