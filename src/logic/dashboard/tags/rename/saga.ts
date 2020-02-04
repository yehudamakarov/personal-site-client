import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { v4 as uuid } from "uuid";
import { IApplicationState } from "../../../../store/rootReducer";
import {
    handleRenameTagJobStatusUpdateAction,
    IRenameTagLoadingAction,
    RENAME_TAG_LOADING,
} from "../../../../store/signalR/actions/JobStatusUpdateActions";
import { JobStage } from "../../../../store/signalR/init";
import { IRenameTagJobStatus } from "../../../../store/signalR/reducer";
import { SocketStatus } from "../../../../store/ui/uiReducer";
import { dashboardTagsApi } from "../tagsJobsApi";

const renameTagJobSuccessfulSelector = (state: IApplicationState) => {
    const stage = state.jobStatus.renameTagStatus.jobStage;
    const socketStatus = state.ui.socketStatus;
    return (stage === JobStage.Done || stage === JobStage.None) && socketStatus === SocketStatus.connected;
};

function handleJobDone(status: IRenameTagJobStatus) {
}

let id: string;

const jobsInFlight: { [index: string]: boolean } = {};

function* renameTagLoading(action: IRenameTagLoadingAction) {
    try {
        const response: AxiosResponse<IRenameTagJobStatus> = yield call(
            dashboardTagsApi.renameTag,
            action.payload.existingTagId,
            action.payload.newTagId,
        );
        yield put(handleRenameTagJobStatusUpdateAction(response.data));

        id = uuid();
        jobsInFlight[id] = true;
        yield delay(10000);
        const jobIsSuccessful = !jobsInFlight[id];
        if (!jobIsSuccessful) {
        }
    } catch (error) {
    }
}

export const registerRenameTagSagaEvents = (connection: HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    connection.on("pushRenameTagJobStatusUpdate", (status: IRenameTagJobStatus) => {
        dispatch(handleRenameTagJobStatusUpdateAction(status));
        if (status.jobStage === JobStage.Done) {
            delete jobsInFlight[id];
            handleJobDone(status);
        }
    });
};

export function* watchRenameTagLoading() {
    yield takeEvery(RENAME_TAG_LOADING, renameTagLoading);
}
