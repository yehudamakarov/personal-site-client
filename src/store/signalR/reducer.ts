import {
    HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE,
    IHandleCalculateTagCountsJobStatusUpdateAction,
} from "./actions/handleCalculateTagCountsJobStatusUpdate";
import {
    HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE,
    IHandleGithubRepoFetcherJobStatusUpdateAction,
} from "./actions/handleGithubRepoFetcherJobStatusUpdate";
import { JobStage } from "./registerJobStatusUpdates";

type JobStatusActionTypes =
    | IHandleGithubRepoFetcherJobStatusUpdateAction
    | IHandleCalculateTagCountsJobStatusUpdateAction;

export interface IGithubRepoFetcherStatus {
    itemStatus: { [index: string]: JobStage };
    jobStage: JobStage;
}

export interface ICalculateTagCountsStatus {
    jobStage: JobStage;
}

export interface IJobStatusState {
    githubRepoFetcherStatus: IGithubRepoFetcherStatus;
    calculateTagCountsStatus: ICalculateTagCountsStatus;
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
