import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { blogPostsApi, IBlogPostResponse } from "../api";
import {
    GET_BLOG_POST_BY_ID_LOADING,
    getBlogPostByIdErrorAction,
    getBlogPostByIdSuccessAction,
    IGetBlogPostByIdLoadingAction,
} from "./actions";

function* getBlogPostById(action: IGetBlogPostByIdLoadingAction) {
    try {
        const { payload: blogPostId } = action;
        if (!blogPostId) {
            throw new Error("The blogPostId was undefined.");
        }
        const response: AxiosResponse<IBlogPostResponse> = yield call(
            blogPostsApi.getBlogPostById,
            blogPostId
        );
        const blogPostResponse = response.data;
        yield put(getBlogPostByIdSuccessAction(blogPostResponse));
    } catch (error) {
        const blogPostId = action.payload;
        yield put(getBlogPostByIdErrorAction(error, blogPostId));
    }
}

export function* watchGetBlogPostById() {
    yield takeEvery(GET_BLOG_POST_BY_ID_LOADING, getBlogPostById);
}
