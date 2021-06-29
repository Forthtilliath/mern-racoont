import {
    DELETE_COMMENT,
    DELETE_POST,
    EDIT_COMMENT,
    GET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    UPDATE_POST,
} from '../actions/post.actions';

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
                          likers: post.likers.filter(
                              (id) => id !== action.payload.userId,
                          ),
                      }
                    : post;
            });
        case UPDATE_POST:
            return state.map((post) => {
                return post._id === action.payload.postId
                    ? {
                          ...post,
                          message: action.payload.message,
                      }
                    : post;
            });
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId);
        case EDIT_COMMENT:
            return state.map((post) => {
                return post._id === action.payload.postId
                    ? {
                          ...post,
                          comments: post.comments.map((comment) => {
                              return comment._id === action.payload.commentId
                                  ? { ...comment, text: action.payload.text }
                                  : comment;
                          }),
                      }
                    : post;
            });
        case DELETE_COMMENT:
            return state.map((post) => {
                return post._id === action.payload.postId
                    ? {
                        ...post,
                        comments: post.comments.filter(
                            (comment) => comment._id !== action.payload.commentId,
                        ),
                    }
                    : post;
            });
        default:
            return state;
    }
}
