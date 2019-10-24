import { IBlogPost } from "../api";

/* -------------------------------------------------------------------------- */
/*                          getBlogPostsLoadingAction                         */
/* -------------------------------------------------------------------------- */

export const GET_BLOG_POSTS_LOADING = "GET_BLOG_POSTS_LOADING";
export interface IGetBlogPostsLoadingAction {
    type: typeof GET_BLOG_POSTS_LOADING;
}

export const getBlogPostsLoadingAction = (): IGetBlogPostsLoadingAction => ({
    type: GET_BLOG_POSTS_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          getBlogPostsSuccessAction                         */
/* -------------------------------------------------------------------------- */

export const GET_BLOG_POSTS_SUCCESS = "GET_BLOG_POSTS_SUCCESS";
export interface IGetBlogPostsSuccessAction {
    type: typeof GET_BLOG_POSTS_SUCCESS;
    payload: IBlogPost[];
}

export const getBlogPostsSuccessAction = (
    blogPosts: IBlogPost[]
): IGetBlogPostsSuccessAction => ({
    payload: blogPosts,
    type: GET_BLOG_POSTS_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           getBlogPostsErrorAction                          */
/* -------------------------------------------------------------------------- */

export const GET_BLOG_POSTS_ERROR = "GET_BLOG_POSTS_ERROR";
export interface IGetBlogPostsErrorAction {
    payload: Error;
    type: typeof GET_BLOG_POSTS_ERROR;
}

export const getBlogPostsErrorAction = (
    error: Error
): IGetBlogPostsErrorAction => ({
    payload: error,
    type: GET_BLOG_POSTS_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type GetBlogPostsActionTypes =
    | IGetBlogPostsLoadingAction
    | IGetBlogPostsSuccessAction
    | IGetBlogPostsErrorAction;
