import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
    GET_BLOG_POSTS_LOADING,
    getBlogPostsErrorAction,
    getBlogPostsSuccessAction,
} from "../actions/getBlogPosts";
import { blogPostsApi, IBlogPostsResponse } from "../api";

function* getBlogPosts() {
    try {
        const response: AxiosResponse<IBlogPostsResponse> = yield call(
            blogPostsApi.getBlogPosts
        );
        yield put(getBlogPostsSuccessAction(response.data.data));
    } catch (error) {
        yield put(getBlogPostsErrorAction(error));
    }
}

export function* watchGetBlogPosts() {
    yield takeEvery(GET_BLOG_POSTS_LOADING, getBlogPosts);
}
