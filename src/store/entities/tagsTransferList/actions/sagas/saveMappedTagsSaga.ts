import { AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApplicationState } from "../../../../rootReducer";
import { IFacade } from "../../../projects/ui/selectors";
import { MapTagResponse, tagsTransferListApi } from "../../api";
import { FacadeIds } from "../../tagsTransferListReducer";
import { IMapTagLoadingAction, MAP_TAG_LOADING, mapTagErrorAction, mapTagSuccessAction } from "../mapTag";

const facadeItemsFromIdsSelector = (facadeIds: FacadeIds) => (state: IApplicationState): IFacade[] => {
    const results: IFacade[] = [];
    for (const transferListFacadeId of facadeIds) {
        results.push(state.tagsTransferList.facadeItems[transferListFacadeId]);
    }
    return results;
};

function* mapTag(action: IMapTagLoadingAction) {
    try {
        const tagId = action.payload;
        const facadeIdsToBeMapped: FacadeIds = yield select((state: IApplicationState) => state.tagsTransferList.left);
        const facadesToBeMapped: IFacade[] = yield select(facadeItemsFromIdsSelector(facadeIdsToBeMapped));
        debugger;
        const response: AxiosResponse<MapTagResponse> = yield call(
            tagsTransferListApi.mapTag,
            facadesToBeMapped,
            tagId,
        );
        yield put(mapTagSuccessAction(response.data.data));
    } catch (error) {
        yield put(mapTagErrorAction(JSON.stringify(error)));
    }
}

export function* watchMapTag() {
    yield takeEvery(MAP_TAG_LOADING, mapTag);
}
