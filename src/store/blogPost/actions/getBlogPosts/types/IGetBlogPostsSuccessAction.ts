import { IBlogPost } from "../../../types";
import { GET_BLOG_POSTS_SUCCESS } from "../index";
export interface IGetBlogPostsSuccessAction {
    type: typeof GET_BLOG_POSTS_SUCCESS;
    payload: IBlogPost[];
}
