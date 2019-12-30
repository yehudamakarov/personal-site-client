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
    tagIds: string[];
    slug: string;
}

export const blogPostsApi = {
    getBlogPostById: (blogPostId: string) =>
        axios.get<IBlogPostResponse>(`/blogPosts/blogPostById`, {
            params: { blogPostId },
        }),
    getBlogPosts: () => axios.get<IBlogPostsResponse>(`/blogPosts/allBlogPosts`),
    getBlogPostsByProjectId: (projectId: string) =>
        axios.get<IBlogPostsResponse>(`/blogPosts/BlogPostsByProjectId`, {
            params: { projectId },
        }),
};
