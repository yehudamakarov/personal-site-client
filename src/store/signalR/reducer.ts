import { IResult } from "../baseTypes/IResult";
import { Tag } from "../entities/tags/actions/api";
import {
    HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE,
    HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE,
    HANDLE_MAP_TAG_JOB_STATUS_UPDATE,
    JobStatusUpdateActions,
} from "./actions/JobStatusUpdateActions";
import { JobStage } from "./init";

interface IJobStatus<T> {
    item: T | null;
    jobStage: JobStage;
}

export interface IGithubRepoFetcherStatus extends IJobStatus<{ [index: string]: JobStage }> {
}

export interface ICalculateTagCountsStatus extends IJobStatus<IResult<Tag>> {
}

export interface IMapTagJobStatus extends IJobStatus<IResult<Tag>> {
}

export interface IJobStatusState {
    githubRepoFetcherStatus: IGithubRepoFetcherStatus;
    calculateTagCountsStatus: ICalculateTagCountsStatus;
    mapTagStatus: IMapTagJobStatus;
}

const INITIAL_STATE: IJobStatusState = {
    calculateTagCountsStatus: {
        item: null,
        jobStage: JobStage.None,
    },
    githubRepoFetcherStatus: {
        item: {},
        jobStage: JobStage.None,
    },
    mapTagStatus: { item: null, jobStage: JobStage.None },
};

export const jobStatusReducer = (state = INITIAL_STATE, action: JobStatusUpdateActions): IJobStatusState => {
    switch (action.type) {
        case HANDLE_MAP_TAG_JOB_STATUS_UPDATE:
            return { ...state, mapTagStatus: action.payload };
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
