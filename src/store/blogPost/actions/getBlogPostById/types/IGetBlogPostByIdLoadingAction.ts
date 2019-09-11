import { IApiResponse } from "../../../../general/types/IApiResponse";
import { IBlogPost } from "../../../types";
import { GET_BLOG_POST_BY_ID_LOADING } from "../index";
export interface IGetBlogPostByIdLoadingAction {
    type: typeof GET_BLOG_POST_BY_ID_LOADING;
    payload?: string;
}
