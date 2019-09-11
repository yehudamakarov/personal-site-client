import { GET_BLOG_POSTS_BY_PROJECT_ID_ERROR } from "../index";
export interface IGetBlogPostsByProjectIdErrorAction {
    type: typeof GET_BLOG_POSTS_BY_PROJECT_ID_ERROR;
    payload: {
        error: Error;
        projectId?: string;
    };
}
