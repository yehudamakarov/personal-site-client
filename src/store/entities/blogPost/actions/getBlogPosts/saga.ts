import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { blogPostsApi, IBlogPostsResponse } from "../api";
import { GET_BLOG_POSTS_LOADING, getBlogPostsErrorAction, getBlogPostsSuccessAction } from "./actions";

function* getBlogPosts() {
    try {
        const response: AxiosResponse<IBlogPostsResponse> = yield call(
            blogPostsApi.getBlogPosts
        );
        yield put(getBlogPostsSuccessAction(response.data.data));
    } catch (error) {
        const errorContent = JSON.stringify(error.stack);
        yield put(getBlogPostsErrorAction(errorContent));
    }
}

export function* watchGetBlogPosts() {
    yield takeEvery(GET_BLOG_POSTS_LOADING, getBlogPosts);
}
