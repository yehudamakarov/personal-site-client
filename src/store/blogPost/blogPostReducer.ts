import {
    GET_BLOG_POST_BY_ID_ERROR,
    GET_BLOG_POST_BY_ID_LOADING,
    GET_BLOG_POST_BY_ID_SUCCESS,
    GetBlogPostByIdActionsType as GetBlogPostByIdActionTypes,
} from "./actions/getBlogPostById";
import {
    GET_BLOG_POSTS_BY_PROJECT_ID_ERROR,
    GET_BLOG_POSTS_BY_PROJECT_ID_LOADING,
    GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS,
    GetBlogPostsByProjectIdActionTypes,
} from "./actions/getBlogPostsByProjectId";
import { IBlogPostState } from "./types/IBlogPostState";

const INITIAL_STATE: IBlogPostState = {
    blogPostData: [],
    blogPostUi: {
        allIsError: false,
        allIsLoading: false,
        singleIsError: {},
        singleIsLoading: {},
    },
};

type BlogPostsActionTypes =
    | GetBlogPostByIdActionTypes
    | GetBlogPostsByProjectIdActionTypes;

export const blogPostsReducer = (
    state = INITIAL_STATE,
    action: BlogPostsActionTypes
): IBlogPostState => {
    switch (action.type) {
        case GET_BLOG_POSTS_BY_PROJECT_ID_LOADING: {
            return state;
        }
        case GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS: {
            return state;
        }
        case GET_BLOG_POSTS_BY_PROJECT_ID_ERROR: {
            return state;
        }
        case GET_BLOG_POST_BY_ID_ERROR: {
            return state;
        }
        case GET_BLOG_POST_BY_ID_LOADING: {
            return state;
        }
        case GET_BLOG_POST_BY_ID_SUCCESS: {
            return state;
        }

        default:
            return state;
    }
};
