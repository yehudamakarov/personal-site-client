import { IResult } from "../baseTypes/IResult";
import { ITag } from "../entities/tags/actions/api";
import {
    HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE,
    IHandleCalculateTagCountsJobStatusUpdateAction,
} from "./actions/handleCalculateTagCountsJobStatusUpdate";
import {
    HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE,
    IHandleGithubRepoFetcherJobStatusUpdateAction,
} from "./actions/handleGithubRepoFetcherJobStatusUpdate";
import { JobStage } from "./init";

type JobStatusActionTypes =
    | IHandleGithubRepoFetcherJobStatusUpdateAction
    | IHandleCalculateTagCountsJobStatusUpdateAction;

interface IJobStatus<T> {
    item: T;
    jobStage: JobStage;
}

export interface IGithubRepoFetcherStatus extends IJobStatus<{ [index: string]: JobStage }> {
}

export interface ICalculateTagCountsStatus extends IJobStatus<IResult<ITag>> {
}

export interface IMapTagJobStatus {
    [index: string]: IJobStatus<IResult<ITag>>;
}

export interface IJobStatusState {
    githubRepoFetcherStatus: IGithubRepoFetcherStatus;
    calculateTagCountsStatus: ICalculateTagCountsStatus;
    mapTagStatus: IMapTagJobStatus;
}

const INITIAL_STATE: IJobStatusState = {
    calculateTagCountsStatus: {
        jobStage: JobStage.None,
    },
    githubRepoFetcherStatus: {
        itemStatus: {},
        jobStage: JobStage.None,
    },
};

export const jobStatusReducer = (state = INITIAL_STATE, action: JobStatusActionTypes): IJobStatusState => {
    switch (action.type) {
        case HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE:
            return { ...state, calculateTagCountsStatus: action.payload };
        case HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE: {
            return { ...state, githubRepoFetcherStatus: action.payload };
        }
        default: {
            return state;
        }
    }
};
