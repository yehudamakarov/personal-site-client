import { AxiosResponse } from "axios";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { blogPostsApi, IBlogPostsResponse } from "../api";
import {
    GET_BLOG_POSTS_BY_PROJECT_ID_LOADING,
    getBlogPostsByProjectIdErrorAction,
    getBlogPostsByProjectIdSuccessAction,
    IGetBlogPostsByProjectIdLoadingAction,
} from "./actions";

function* getBlogPostsByProjectId(
    action: IGetBlogPostsByProjectIdLoadingAction
) {
    const { payload: projectId } = action;
    try {
        if (!projectId) {
            throw new Error(
                "The project id was undefined. Cannot get the the blog posts for this project."
            );
        }
        const response: AxiosResponse<IBlogPostsResponse> = yield call(
            blogPostsApi.getBlogPostsByProjectId,
            projectId
        );
        const blogPostResponse = response.data;
        yield delay(1000);
        yield put(getBlogPostsByProjectIdSuccessAction(blogPostResponse));
    } catch (error) {
        const errorContent = JSON.stringify(error.toJSON());
        yield put(getBlogPostsByProjectIdErrorAction(errorContent, projectId));
    }
}

export function* watchGetBlogPostsByProjectId() {
    yield takeEvery(
        GET_BLOG_POSTS_BY_PROJECT_ID_LOADING,
        getBlogPostsByProjectId
    );
}
