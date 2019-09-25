import { IApiResponse } from "../../../../general/types/IApiResponse";
import { IBlogPostResponse } from "../../../api";
import { IBlogPost } from "../../../types";
import { GET_BLOG_POST_BY_ID_SUCCESS } from "../index";
export interface IGetBlogPostByIdSuccessAction {
    type: typeof GET_BLOG_POST_BY_ID_SUCCESS;
    payload: IBlogPostResponse;
}
