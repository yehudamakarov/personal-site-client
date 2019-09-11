import { IApiResponse } from "../../../general/types/IApiResponse";

import { IBlogPost } from "../../types";
import { IGetBlogPostsByProjectIdErrorAction } from "./types/IGetBlogPostsByProjectIdErrorAction";
import { IGetBlogPostsByProjectIdLoadingAction } from "./types/IGetBlogPostsByProjectIdLoadingAction";
import { IGetBlogPostsByProjectIdSuccessAction } from "./types/IGetBlogPostsByProjectIdSuccessAction";

export const getBlogPostsByProjectIdLoadingAction = (
    projectId?: string
): IGetBlogPostsByProjectIdLoadingAction => ({
    payload: projectId,
    type: GET_BLOG_POSTS_BY_PROJECT_ID_LOADING,
});
export const GET_BLOG_POSTS_BY_PROJECT_ID_LOADING =
    "GET_BLOG_POSTS_BY_PROJECT_ID_LOADING";

export const getBlogPostsByProjectIdErrorAction = (
    error: Error,
    projectId?: string
): IGetBlogPostsByProjectIdErrorAction => ({
    payload: { error, projectId },
    type: GET_BLOG_POSTS_BY_PROJECT_ID_ERROR,
});
export const GET_BLOG_POSTS_BY_PROJECT_ID_ERROR =
    "GET_BLOG_POSTS_BY_PROJECT_ID_ERROR";

export const getBlogPostsByProjectIdSuccessAction = (
    blogPostsResponse: IApiResponse<IBlogPost[]>
): IGetBlogPostsByProjectIdSuccessAction => ({
    payload: blogPostsResponse,
    type: GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS,
});
export const GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS =
    "GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS";

export type GetBlogPostsByProjectIdActionTypes =
    | IGetBlogPostsByProjectIdErrorAction
    | IGetBlogPostsByProjectIdSuccessAction
    | IGetBlogPostsByProjectIdLoadingAction;
