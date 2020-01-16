import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { ResultStatus } from "../../../../baseTypes/ResultStatus";
import { IApplicationState } from "../../../../rootReducer";
import { JobStage } from "../../../../signalR/init";
import { IMapTagJobStatus } from "../../../../signalR/reducer";
import { IFacade } from "../../../projects/ui/selectors";
import { tagsTransferListApi } from "../../api";
import { FacadeIds } from "../../tagsTransferListReducer";
import { handleMapTagJobStatusUpdateAction, IMapTagLoadingAction, MAP_TAG_LOADING } from "../tagsTransferListActions";

const facadeItemsFromIdsSelector = (facadeIds: FacadeIds) => (state: IApplicationState): IFacade[] => {
    const results: IFacade[] = [];
    for (const transferListFacadeId of facadeIds) {
        results.push(state.tagsTransferList.facadeItems[transferListFacadeId]);
    }
    return results;
};

function* mapTag(action: IMapTagLoadingAction) {
    const tagId = action.payload;
    try {
        const facadeIdsToBeMapped: FacadeIds = yield select((state: IApplicationState) => state.tagsTransferList.left);
        const facadesToBeMapped: IFacade[] = yield select(facadeItemsFromIdsSelector(facadeIdsToBeMapped));
        const response: AxiosResponse<IMapTagJobStatus> = yield call(
            tagsTransferListApi.mapTag,
            facadesToBeMapped,
            tagId,
        );
        yield put(handleMapTagJobStatusUpdateAction(response.data));

        // class Person {
        //     public name: string = "default"
        //     public address: string = "default"
        //     public age: number = 0;
        //
        //     public constructor(init?:Partial<Person>) {
        //         Object.assign(this, init);
        //     }
        // }
        //
        // let persons = [
        //     new Person(),
        //     new Person({}),
        //     new Person({name:"John"}),
        //     new Person({address:"Earth"}),
        //     new Person({age:20, address:"Earth", name:"John"}),
        // ];

        // yield put();
        // when web socket broadcasts success, save tagId to 'map successful'
        // after delay(10000) check if successful or error and then if socket is connected
    } catch (error) {
        const errorInfo = JSON.stringify(error);
        yield put(
            handleMapTagJobStatusUpdateAction({
                tagId: {
                    item: {
                        data: { tagId },
                        details: {
                            message: error,
                            resultStatus: ResultStatus.Failure,
                        },
                    },
                    jobStage: JobStage.Error,
                },
            }),
        );
    }
}

export const registerMapTagSagaEvents = (connection: HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    connection.on("pushMapTagJobStatusUpdate", (status: IMapTagJobStatus) => {
        dispatch(handleMapTagJobStatusUpdateAction(status));
    });
};

export function* watchMapTag() {
    yield takeEvery(MAP_TAG_LOADING, mapTag);
}
