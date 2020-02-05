import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, delay, put, select, takeEvery } from "redux-saga/effects";
import { Tag } from "../../../../store/entities/tags/actions/api";

import { IApplicationState } from "../../../../store/rootReducer";
import {
    handleRenameTagJobStatusUpdateAction,
    IRenameTagLoadingAction,
    RENAME_TAG_LOADING,
} from "../../../../store/signalR/actions/JobStatusUpdateActions";
import { JobStage } from "../../../../store/signalR/init";
import { RenameTagJobStatus } from "../../../../store/signalR/reducer";
import { SocketStatus } from "../../../../store/ui/uiReducer";
import { dashboardTagsApi } from "../tagsJobsApi";
import { tagRenameJobDoneAction } from "./actions";

enum JobButtonStatus {
    Default,
    InProgress,
    Warning,
}

const renameTagJobSuccessfulSelector = (tagId: Tag["tagId"]) => (state: IApplicationState): JobButtonStatus => {
    const stage = state.jobStatus.renameTagStatus[tagId].jobStage;
    const socketStatus = state.ui.socketStatus;
    if (socketStatus === SocketStatus.disconnected || socketStatus === SocketStatus.connecting) {
        return JobButtonStatus.Warning;
    }
    if (stage === JobStage.Done || stage === JobStage.None) {
        return JobButtonStatus.Default;
    }
    if (stage === JobStage.Warning) {
        return JobButtonStatus.Warning;
    }
    return JobButtonStatus.InProgress;
};

function handleJobDone(status: RenameTagJobStatus, dispatch: EnhancedStore["dispatch"]) {
    dispatch(tagRenameJobDoneAction(status.item));
}

function* renameTagLoading(action: IRenameTagLoadingAction) {
    try {
        const response: AxiosResponse<RenameTagJobStatus> = yield call(
            dashboardTagsApi.renameTag,
            action.payload.existingTagId,
            action.payload.newTagId
        );
        yield put(handleRenameTagJobStatusUpdateAction(response.data));

        yield delay(10000);
        const jobIsSuccessful = yield select(renameTagJobSuccessfulSelector(action.payload.existingTagId));
        if (!jobIsSuccessful) {
        }
    } catch (error) {}
}

export const registerRenameTagSagaEvents = (connection: HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    connection.on("pushRenameTagJobStatusUpdate", (status: RenameTagJobStatus) => {
        dispatch(handleRenameTagJobStatusUpdateAction(status));
        if (status.jobStage === JobStage.Done) {
            handleJobDone(status, dispatch);
        }
    });
};

export function* watchRenameTagLoading() {
    yield takeEvery(RENAME_TAG_LOADING, renameTagLoading);
}
