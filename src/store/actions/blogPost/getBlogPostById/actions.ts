import { IApiResponse } from "../../../types/IApiResponse";
import { IBlogPost, IBlogPostResponse } from "../api";

/* -------------------------------------------------------------------------- */
/*                        getBlogPostByIdLoadingAction                        */
/* -------------------------------------------------------------------------- */

export const getBlogPostByIdLoadingAction = (
    blogPostId?: string
): IGetBlogPostByIdLoadingAction => ({
    payload: blogPostId,
    type: GET_BLOG_POST_BY_ID_LOADING,
});
export const GET_BLOG_POST_BY_ID_LOADING = "GET_BLOG_POST_BY_ID_LOADING";

export interface IGetBlogPostByIdLoadingAction {
    type: typeof GET_BLOG_POST_BY_ID_LOADING;
    payload?: string;
}

/* -------------------------------------------------------------------------- */
/*                        getBlogPostByIdSuccessAction                        */
/* -------------------------------------------------------------------------- */

export const getBlogPostByIdSuccessAction = (
    blogPostResponse: IApiResponse<IBlogPost>
): IGetBlogPostByIdSuccessAction => ({
    payload: blogPostResponse,
    type: GET_BLOG_POST_BY_ID_SUCCESS,
});
export const GET_BLOG_POST_BY_ID_SUCCESS = "GET_BLOG_POST_BY_ID_SUCCESS";
export interface IGetBlogPostByIdSuccessAction {
    type: typeof GET_BLOG_POST_BY_ID_SUCCESS;
    payload: IBlogPostResponse;
}

/* -------------------------------------------------------------------------- */
/*                         getBlogPostByIdErrorAction                         */
/* -------------------------------------------------------------------------- */
export interface IGetBlogPostByIdErrorAction {
    type: typeof GET_BLOG_POST_BY_ID_ERROR;
    payload: { error: Error; blogPostId?: string };
}

export const getBlogPostByIdErrorAction = (
    error: Error,
    blogPostId?: string
): IGetBlogPostByIdErrorAction => ({
    payload: { error, blogPostId },
    type: GET_BLOG_POST_BY_ID_ERROR,
});
export const GET_BLOG_POST_BY_ID_ERROR = "GET_BLOG_POST_BY_ID_ERROR";

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type GetBlogPostByIdActionTypes =
    | IGetBlogPostByIdErrorAction
    | IGetBlogPostByIdLoadingAction
    | IGetBlogPostByIdSuccessAction;
