import { fork } from "redux-saga/effects";
import { watchGetBlogPostById } from "./getBlogPostByIdSaga";
import { watchGetBlogPostsByProjectId } from "./getBlogPostsByProjectIdSaga";

export const blogPostSagas = [
    fork(watchGetBlogPostById),
    fork(watchGetBlogPostsByProjectId),
];
