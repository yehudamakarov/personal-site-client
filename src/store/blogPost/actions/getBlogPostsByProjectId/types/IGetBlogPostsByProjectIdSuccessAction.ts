import { IApiResponse } from "../../../../general/types/IApiResponse";
import { IBlogPostResponse, IBlogPostsResponse } from "../../../api";
import { IBlogPost } from "../../../types";
import { GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS } from "../index";
export interface IGetBlogPostsByProjectIdSuccessAction {
    type: typeof GET_BLOG_POSTS_BY_PROJECT_ID_SUCCESS;
    payload?: IBlogPostsResponse;
}
