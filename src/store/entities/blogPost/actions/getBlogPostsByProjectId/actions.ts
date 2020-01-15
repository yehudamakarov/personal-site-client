import { IResult } from "../../../../baseTypes/IResult";
import { IBlogPost, IBlogPostsResponse } from "../api";

/* -------------------------------------------------------------------------- */
/*                    getBlogPostsByProjectIdLoadingAction                    */
/* -------------------------------------------------------------------------- */
export const GET_BLOG_POSTS_BY_PROJECT_ID_LOADING =
    "GET_BLOG_POSTS_BY_PROJECT_ID_LOADING";
export interface IGetBlogPostsByProjectIdLoadingAction {
    type: typeof GET_BLOG_POSTS_BY_PROJECT_ID_LOADING;
    payload?: string;
}

export const getBlogPostsByProjectIdLoadingAction = (
    projectId?: string
): IGetBlogPostsByProjectIdLoadingAction => ({
    payload: projectId,
    type: GET_BLOG_POSTS_BY_PROJECT_ID_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                     getBlogPostsByProjectIdErrorAction                     */
/* -------------------------------------------------------------------------- */
export const GET_BLOG_POSTS_BY_PROJECT_ID_ERROR =
    "GET_BLOG_POSTS_BY_PROJECT_ID_ERROR";
export interface IGetBlogPostsByProjectIdErrorAction {
    type: typeof GET_BLOG_POSTS_BY_PROJECT_ID_ERROR;
    payload: {
        error: string;
        projectId?: string;
    };
}

export const getBlogPostsByProjectIdErrorAction = (
    error: string,
    projectId?: string
): IGetBlogPostsByProjectIdErrorAction => ({
    payload: { error, projectId },
    type: GET_BLOG_POSTS_BY_PROJECT_ID_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                    getBlogPostsByProjectIdSuccessAction                    */
/* -------------------------------------------------------------------------- */
export const GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS =
    "GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS";
export interface IGetBlogPostsByProjectIdSuccessAction {
    type: typeof GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS;
    payload: IBlogPostsResponse;
}

export const getBlogPostsByProjectIdSuccessAction = (
    blogPostsResponse: IResult<IBlogPost[]>,
): IGetBlogPostsByProjectIdSuccessAction => ({
    payload: blogPostsResponse,
    type: GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */
export type GetBlogPostsByProjectIdActionTypes =
    | IGetBlogPostsByProjectIdErrorAction
    | IGetBlogPostsByProjectIdSuccessAction
    | IGetBlogPostsByProjectIdLoadingAction;
