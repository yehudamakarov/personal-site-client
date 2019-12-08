import axios from "axios";
import { IApiResponse } from "../../../baseTypes/IApiResponse";

export type IBlogPostResponse = IApiResponse<IBlogPost>;
export type IBlogPostsResponse = IApiResponse<IBlogPost[]>;

export interface IBlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    projectId: string;
    tagIds: string[] | null;
    slug: string;
}

export const blogPostsApi = {
    getBlogPostById: (blogPostId: string) =>
        axios.get<IBlogPostResponse>(`${process.env.REACT_APP_API_URL}blogPosts/blogPostById`, {
            params: { blogPostId },
        }),
    getBlogPosts: () => axios.get<IBlogPostsResponse>(`${process.env.REACT_APP_API_URL}blogPosts/allBlogPosts`),
    getBlogPostsByProjectId: (projectId: string) =>
        axios.get<IBlogPostsResponse>(`${process.env.REACT_APP_API_URL}blogPosts/BlogPostsByProjectId`, {
            params: { projectId },
        }),
};
