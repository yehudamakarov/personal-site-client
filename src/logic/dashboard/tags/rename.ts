import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, delay, put, select, takeEvery } from "redux-saga/effects";
import { IResult } from "../../../store/baseTypes/IResult";
import { Tag } from "../../../store/entities/tags/actions/api";
import { IApplicationState } from "../../../store/rootReducer";
import {
    handleRenameTagJobStatusUpdateAction,
    IRenameTagLoadingAction,
    RENAME_TAG_LOADING,
} from "../../../store/signalR/actions/JobStatusUpdateActions";
import { JobStage } from "../../../store/signalR/init";
import {
    IDeleteTagJobStatusLookup,
    IMapTagJobStatusLookup,
    IRenameTagJobStatusLookup,
    MapTagJobStatus,
    RenameTagJobStatus,
} from "../../../store/signalR/reducer";
import { SocketStatus } from "../../../store/ui/uiReducer";
import { dashboardTagsApi } from "./tagsJobsApi";

export enum JobButtonStatus {
    Default,
    InProgress,
    Warning,
}

export type JobStates =
// IGithubRepoFetcherStatus|
// ICalculateTagCountsStatus|
    IMapTagJobStatusLookup | IRenameTagJobStatusLookup | IDeleteTagJobStatusLookup;

export const jobSuccessfulSelector = (key: string, statusSelector: (state: IApplicationState) => JobStates) => (
    state: IApplicationState,
): JobButtonStatus => {
    const socketStatus = state.ui.socketStatus;
    if (socketStatus === SocketStatus.disconnected || socketStatus === SocketStatus.connecting) {
        return JobButtonStatus.Warning;
    }
    const status = statusSelector(state);
    // if there is nothing in the status lookup for this id, then the job can be started
    const stage = status[key] ? status[key].jobStage : JobStage.None;
    if (stage === JobStage.Done || stage === JobStage.None) {
        return JobButtonStatus.Default;
    }
    if (stage === JobStage.Warning) {
        return JobButtonStatus.Warning;
    }
    return JobButtonStatus.InProgress;
};

function handleJobDone(status: RenameTagJobStatus, dispatch: EnhancedStore["dispatch"]) {
    dispatch(tagRenameJobDoneAction(status.uniqueKey, status.item));
}

function* renameTagLoading(action: IRenameTagLoadingAction) {
    try {
        const response: AxiosResponse<RenameTagJobStatus> = yield call(
            dashboardTagsApi.renameTag,
            action.payload.uniqueKey,
            action.payload.existingTagId,
            action.payload.newTagId,
        );
        yield put(handleRenameTagJobStatusUpdateAction(response.data));

        yield delay(10000);
        const jobStatus: JobButtonStatus = yield select(
            jobSuccessfulSelector(action.payload.existingTagId, (state) => state.jobStatus.renameTagStatus),
        );
        if (jobStatus === JobButtonStatus.InProgress) {
            yield put(handleRenameTagJobStatusUpdateAction({ ...response.data, jobStage: JobStage.Warning }));
        }
    } catch (error) {
        yield put(
            handleRenameTagJobStatusUpdateAction({
                ...{ uniqueKey: action.payload.uniqueKey, item: null },
                jobStage: JobStage.Error,
            }),
        );
    }
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

export const TAG_RENAME_JOB_DONE = "TAG_RENAME_JOB_DONE";

export interface ITagRenameJobDoneAction {
    type: typeof TAG_RENAME_JOB_DONE;
    payload: { item: IResult<Tag> | null; uniqueKey: string };
}

export const tagRenameJobDoneAction = (uniqueKey: string, item: IResult<Tag> | null): ITagRenameJobDoneAction => ({
    payload: { item, uniqueKey },
    type: TAG_RENAME_JOB_DONE,
});
// =============================================================================== //
export const MAP_TAG_JOB_DONE = "MAP_TAG_JOB_DONE";

export interface IMapTagJobDoneAction {
    type: typeof MAP_TAG_JOB_DONE;
    payload: MapTagJobStatus;
}

export const mapTagJobDoneAction = (status: MapTagJobStatus): IMapTagJobDoneAction => ({
    payload: status,
    type: MAP_TAG_JOB_DONE,
});
// =============================================================================== //
