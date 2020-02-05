import { IResult } from "../baseTypes/IResult";
import { Tag } from "../entities/tags/actions/api";
import {
    HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE,
    HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE,
    HANDLE_MAP_TAG_JOB_STATUS_UPDATE,
    HANDLE_RENAME_TAG_JOB_STATUS_UPDATE,
    JobStatusUpdateActions,
    MAP_TAG_LOADING,
    RENAME_TAG_LOADING,
} from "./actions/JobStatusUpdateActions";
import { JobStage } from "./init";

interface IJobStatus<T> {
    uniqueKey?: string;
    item: T | null;
    jobStage: JobStage;
}

export interface IGithubRepoFetcherStatus extends IJobStatus<{ [index: string]: JobStage }> {
}

export interface ICalculateTagCountsStatus extends IJobStatus<IResult<Tag>> {
}

export type MapTagJobStatus = IJobStatus<IResult<Tag>>;

export interface IMapTagJobStatusLookup {
    [indexer: string]: MapTagJobStatus;
}

export type RenameTagJobStatus = IJobStatus<IResult<Tag>>;

export interface IRenameTagJobStatusLookup {
    [indexer: string]: RenameTagJobStatus;
}

export interface IJobStatusState {
    githubRepoFetcherStatus: IGithubRepoFetcherStatus;
    calculateTagCountsStatus: ICalculateTagCountsStatus;
    mapTagStatus: IMapTagJobStatusLookup;
    renameTagStatus: IRenameTagJobStatusLookup;
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
    mapTagStatus: {},
    renameTagStatus: {},
};

export const jobStatusReducer = (state = INITIAL_STATE, action: JobStatusUpdateActions): IJobStatusState => {
    switch (action.type) {
        // =============================================================================== //
        // Triggered
        // =============================================================================== //
        case RENAME_TAG_LOADING: {
            const { existingTagId } = action.payload;
            return {
                ...state,
                renameTagStatus: {
                    ...state.renameTagStatus,
                    [existingTagId]: {
                        item: null,
                        jobStage: JobStage.InProgress,
                    },
                },
            };
        }
        case HANDLE_RENAME_TAG_JOB_STATUS_UPDATE: {
            const { jobStage, item, uniqueKey } = action.payload;
            if (uniqueKey) {
                return {
                    ...state,
                    renameTagStatus: { ...state.renameTagStatus, [uniqueKey]: { item, jobStage } },
                };
            } else {
                return state;
            }
        }
        case MAP_TAG_LOADING: {
            return {
                ...state,
                mapTagStatus: {
                    ...state.mapTagStatus,
                    [action.payload]: { jobStage: JobStage.InProgress, item: null },
                },
            };
        }
        case HANDLE_MAP_TAG_JOB_STATUS_UPDATE: {
            const { jobStage, item, uniqueKey } = action.payload;
            if (uniqueKey) {
                return {
                    ...state,
                    mapTagStatus: {
                        ...state.mapTagStatus,
                        [uniqueKey]: { item, jobStage },
                    },
                };
            } else {
                return state;
            }
        }
        // =============================================================================== //

        // =============================================================================== //
        // Recurring
        // =============================================================================== //
        case HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE: {
            return { ...state, calculateTagCountsStatus: action.payload };
        }
        // =============================================================================== //
        case HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE: {
            return { ...state, githubRepoFetcherStatus: action.payload };
        }
        // =============================================================================== //
        default: {
            return state;
        }
    }
};
