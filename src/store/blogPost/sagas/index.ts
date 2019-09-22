import { fork } from "redux-saga/effects";
import { watchGetBlogPostById } from "./getBlogPostByIdSaga";
import { watchGetBlogPostsByProjectId } from "./getBlogPostsByProjectIdSaga";
import { watchGetBlogPosts } from "./getBlogPostsSaga";

export const blogPostSagas = [
    fork(watchGetBlogPostById),
    fork(watchGetBlogPostsByProjectId),
    fork(watchGetBlogPosts),
];
