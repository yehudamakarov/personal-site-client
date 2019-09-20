import { IBlogPost } from "../../types";
import { IGetBlogPostsErrorAction } from "./types/IGetBlogPostsErrorAction";
import { IGetBlogPostsLoadingAction } from "./types/IGetBlogPostsLoadingAction";
import { IGetBlogPostsSuccessAction } from "./types/IGetBlogPostsSuccessAction";

export const GET_BLOG_POSTS_LOADING = "GET_BLOG_POSTS_LOADING";
export const getBlogPostsLoadingAction = (): IGetBlogPostsLoadingAction => ({
    type: GET_BLOG_POSTS_LOADING,
});

export const GET_BLOG_POSTS_SUCCESS = "GET_BLOG_POSTS_SUCCESS";
export const getBlogPostsSuccessAction = (
    blogPosts: IBlogPost[]
): IGetBlogPostsSuccessAction => ({
    payload: blogPosts,
    type: GET_BLOG_POSTS_SUCCESS,
});

export const GET_BLOG_POSTS_ERROR = "GET_BLOG_POSTS_ERROR";
export const getBlogPostsErrorAction = (): IGetBlogPostsErrorAction => ({
    type: GET_BLOG_POSTS_ERROR,
});

export type GetBlogPostsActionTypes =
    | IGetBlogPostsLoadingAction
    | IGetBlogPostsSuccessAction
    | IGetBlogPostsErrorAction;
