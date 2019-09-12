import axios from "axios";
import { IApiResponse } from "../../general/types/IApiResponse";
import { IResultDetails } from "../../pinnedRepositories/types";
import { IBlogPost } from "../types";

export type IBlogPostResponse = IApiResponse<IBlogPost>;
export type IBlogPostsResponse = IApiResponse<IBlogPost[]>;
export const blogPostsApi = {
    getBlogPostById: (blogPostId: string) =>
        axios.get<IBlogPostResponse>(
            `${process.env.REACT_APP_API_URL}blogPosts/blogPostById`,
            { params: { blogPostId } }
        ),
    getBlogPostsByProjectId: (projectId: string) =>
        axios.get<IBlogPostsResponse>(
            `${process.env.REACT_APP_API_URL}blogPosts/BlogPostsByProjectId`,
            { params: { projectId } }
        ),
};
