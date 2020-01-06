import {
    HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE,
    IHandleGithubRepoFetcherJobStatusUpdateAction,
} from "./actions/handleGithubRepoFetcherJobStatusUpdate";
import { GithubRepoFetcherJobStage } from "./registerJobStatusUpdates";

type jobStatusActionTypes = IHandleGithubRepoFetcherJobStatusUpdateAction;

export interface IGithubRepoFetcherStatus {
    itemStatus: { [index: string]: GithubRepoFetcherJobStage };
    jobStatus: GithubRepoFetcherJobStage;
}

export interface IJobStatusState {
    githubRepoFetcherStatus: IGithubRepoFetcherStatus;
}

const INITIAL_STATE: IJobStatusState = {
    githubRepoFetcherStatus: {
        itemStatus: {},
        jobStatus: GithubRepoFetcherJobStage.None,
    },
};

export const jobStatusReducer = (state = INITIAL_STATE, action: jobStatusActionTypes): IJobStatusState => {
    switch (action.type) {
        case HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE: {
            // const currentStatus = action.payload;
            // currentStatus.jobStatus ===
            return { ...state, githubRepoFetcherStatus: action.payload };
        }
        default: {
            return state;
        }
    }
};
