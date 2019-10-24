import { fork } from "redux-saga/effects";
import { watchGetBlogPostById } from "./getBlogPostById/saga";
import { watchGetBlogPosts } from "./getBlogPosts/saga";
import { watchGetBlogPostsByProjectId } from "./getBlogPostsByProjectId/saga";

export const blogPostSagas = [
    fork(watchGetBlogPostById),
    fork(watchGetBlogPostsByProjectId),
    fork(watchGetBlogPosts),
];
