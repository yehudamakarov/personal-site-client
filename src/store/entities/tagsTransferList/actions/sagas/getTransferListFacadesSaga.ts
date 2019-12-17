import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { blogPostsApi, IBlogPostsResponse } from "../../../blogPost/actions/api";
import { IProjectsResponse, projectsApi } from "../../../projects/ui/actions/api";
import { FacadeType, IFacade } from "../../../projects/ui/selectors";
import {
    GET_TRANSFER_LIST_FACADES_LOADING,
    getTransferListFacadesErrorAction,
    getTransferListFacadesSuccessAction,
    IGetTransferListFacadesLoadingAction,
} from "../getTransferListFacades";
import { setLeftAction } from "../setLeft";
import { setRightAction } from "../setRight";

function* getTransferListFacades(action: IGetTransferListFacadesLoadingAction) {
    try {
        const [projectsResponse, blogPostsResponse]: [
            AxiosResponse<IProjectsResponse>,
            AxiosResponse<IBlogPostsResponse>
        ] = yield all([call(projectsApi.getProjects), call(blogPostsApi.getBlogPosts)]);
        const projectFacades: IFacade[] = projectsResponse.data.data.map((value) => ({
            id: value.githubRepoDatabaseId,
            tagIds: value.tagIds,
            title: value.projectTitle,
            type: FacadeType.Project,
        }));
        const blogPostFacades: IFacade[] = blogPostsResponse.data.data.map((value) => ({
            id: value.id,
            tagIds: value.tagIds,
            title: value.title,
            type: FacadeType.BlogPost,
        }));
        const facades = [...projectFacades, ...blogPostFacades];
        yield put(getTransferListFacadesSuccessAction(facades));
        const availableToMapToTag = facades.filter(
            (facade) => facade.tagIds === null || facade.tagIds.every((tagId) => tagId !== action.payload)
        );
        const mappedToTag = facades.filter(
            (facade) => facade.tagIds && facade.tagIds.some((tagId) => tagId === action.payload)
        );
        yield put(setRightAction(availableToMapToTag));
        yield put(setLeftAction(mappedToTag));
    } catch (error) {
        yield put(getTransferListFacadesErrorAction(JSON.parse(error)));
    }
}

export function* watchGetTransferListFacades() {
    yield takeEvery(GET_TRANSFER_LIST_FACADES_LOADING, getTransferListFacades);
}
