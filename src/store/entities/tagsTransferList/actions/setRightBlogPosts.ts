import { IFacade } from "../../projects/ui/selectors";

export const SET_RIGHT_BLOG_POSTS = "SET_RIGHT_BLOG_POSTS";

export interface ISetRightBlogPosts {
    type: typeof SET_RIGHT_BLOG_POSTS;
    payload: IFacade[];
}

export const setRightBlogPostsAction = (projects: IFacade[]): ISetRightBlogPosts => ({
    payload: projects,
    type: SET_RIGHT_BLOG_POSTS,
});
