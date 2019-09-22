import { GET_BLOG_POSTS_ERROR } from "../index";
export interface IGetBlogPostsErrorAction {
    payload: Error;
    type: typeof GET_BLOG_POSTS_ERROR;
}
