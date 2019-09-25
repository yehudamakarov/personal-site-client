import { IApiResponse } from "../../../general/types/IApiResponse";
import { IBlogPost } from "../../types";
import { IGetBlogPostByIdErrorAction } from "./types/IGetBlogPostByIdErrorAction";
import { IGetBlogPostByIdLoadingAction } from "./types/IGetBlogPostByIdLoadingAction";
import { IGetBlogPostByIdSuccessAction } from "./types/IGetBlogPostByIdSuccessAction";

export const getBlogPostByIdLoadingAction = (
    blogPostId?: string
): IGetBlogPostByIdLoadingAction => ({
    payload: blogPostId,
    type: GET_BLOG_POST_BY_ID_LOADING,
});
export const GET_BLOG_POST_BY_ID_LOADING = "GET_BLOG_POST_BY_ID_LOADING";

export const getBlogPostByIdSuccessAction = (
    blogPostResponse: IApiResponse<IBlogPost>
): IGetBlogPostByIdSuccessAction => ({
    payload: blogPostResponse,
    type: GET_BLOG_POST_BY_ID_SUCCESS,
});
export const GET_BLOG_POST_BY_ID_SUCCESS = "GET_BLOG_POST_BY_ID_SUCCESS";

export const getBlogPostByIdErrorAction = (
    error: Error,
    blogPostId?: string
): IGetBlogPostByIdErrorAction => ({
    payload: { error, blogPostId },
    type: GET_BLOG_POST_BY_ID_ERROR,
});
export const GET_BLOG_POST_BY_ID_ERROR = "GET_BLOG_POST_BY_ID_ERROR";

export type GetBlogPostByIdActionTypes =
    | IGetBlogPostByIdErrorAction
    | IGetBlogPostByIdLoadingAction
    | IGetBlogPostByIdSuccessAction;
