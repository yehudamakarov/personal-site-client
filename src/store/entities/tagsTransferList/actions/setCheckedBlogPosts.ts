import { IFacade } from "../../projects/ui/selectors";

export const SET_CHECKED_BLOG_POSTS = "SET_CHECKED_BLOG_POSTS";

export interface ISetCheckedBlogPosts {
    type: typeof SET_CHECKED_BLOG_POSTS;
    payload: IFacade[];
}

export const setCheckedBlogPostsAction = (projects: IFacade[]): ISetCheckedBlogPosts => ({
    payload: projects,
    type: SET_CHECKED_BLOG_POSTS,
});
