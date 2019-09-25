import { GET_BLOG_POSTS_BY_PROJECT_ID_LOADING } from "../index";
export interface IGetBlogPostsByProjectIdLoadingAction {
    type: typeof GET_BLOG_POSTS_BY_PROJECT_ID_LOADING;
    payload?: string;
}
