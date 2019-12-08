import { IFacade } from "../../projects/ui/selectors";

export const SET_LEFT_BLOG_POSTS = "SET_LEFT_BLOG_POSTS";

export interface ISetLeftBlogPosts {
    type: typeof SET_LEFT_BLOG_POSTS;
    payload: IFacade[];
}

export const setLeftBlogPostsAction = (projects: IFacade[]): ISetLeftBlogPosts => ({
    payload: projects,
    type: SET_LEFT_BLOG_POSTS,
});
