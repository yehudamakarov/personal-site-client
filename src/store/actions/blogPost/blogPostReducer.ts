import _ from "lodash";
import { IBaseCollectionUiState } from "../../types/IBaseCollectionUiState";
import { IBlogPost } from "./api";
import {
    GET_BLOG_POST_BY_ID_ERROR,
    GET_BLOG_POST_BY_ID_LOADING,
    GET_BLOG_POST_BY_ID_SUCCESS,
    GetBlogPostByIdActionTypes,
} from "./getBlogPostById/actions";
import {
    GET_BLOG_POSTS_ERROR,
    GET_BLOG_POSTS_LOADING,
    GET_BLOG_POSTS_SUCCESS,
    GetBlogPostsActionTypes,
} from "./getBlogPosts/actions";
import {
    GET_BLOG_POSTS_BY_PROJECT_ID_ERROR,
    GET_BLOG_POSTS_BY_PROJECT_ID_LOADING,
    GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS,
    GetBlogPostsByProjectIdActionTypes,
} from "./getBlogPostsByProjectId/actions";

export interface IBlogPostState {
    blogPostData: IBlogPost[];
    blogPostUi: IBlogPostUi;
}

type IBlogPostUi = IBaseCollectionUiState;

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
    | GetBlogPostsByProjectIdActionTypes
    | GetBlogPostsActionTypes;

export const blogPostsReducer = (
    state = INITIAL_STATE,
    action: BlogPostsActionTypes
): IBlogPostState => {
    switch (action.type) {
        case GET_BLOG_POSTS_BY_PROJECT_ID_LOADING: {
            return {
                ...state,
                blogPostUi: {
                    ...state.blogPostUi,
                    allIsLoading: true,
                },
            };
        }
        case GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS: {
            const incomingBlogPosts = action.payload.data;
            const allBlogPosts = state.blogPostData.concat(incomingBlogPosts);
            const merged = _.uniqWith(allBlogPosts, _.isEqual);
            return {
                blogPostData: merged,
                blogPostUi: {
                    ...state.blogPostUi,
                    allIsLoading: false,
                },
            };
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
        case GET_BLOG_POSTS_LOADING: {
            return {
                ...state,
                blogPostUi: {
                    ...state.blogPostUi,
                    allIsLoading: true,
                },
            };
        }
        case GET_BLOG_POSTS_SUCCESS: {
            const incomingBlogPosts = action.payload;
            const allBlogPosts = state.blogPostData.concat(incomingBlogPosts);
            const merged = _.uniqWith(allBlogPosts, _.isEqual);
            return {
                blogPostData: merged,
                blogPostUi: {
                    ...state.blogPostUi,
                    allIsLoading: false,
                },
            };
        }
        case GET_BLOG_POSTS_ERROR: {
            return state;
        }

        default:
            return state;
    }
};
