import { IApiResponse } from "../../../../general/types/IApiResponse";
import { IBlogPost } from "../../../types";
import { GET_BLOG_POST_BY_ID_ERROR } from "../index";
export interface IGetBlogPostByIdErrorAction {
    type: typeof GET_BLOG_POST_BY_ID_ERROR;
    payload: { error: Error; blogPostId?: string };
}
