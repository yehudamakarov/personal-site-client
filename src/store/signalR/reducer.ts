import { ISetCurrentTagIdBeingMappedAction, SET_CURRENT_TAG_ID_BEING_MAPPED } from "../../logic/dashboard/tags/map";
import { IMapTagJobDoneAction, MAP_TAG_JOB_DONE } from "../../logic/dashboard/tags/rename";
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

interface IJobStatusUpdate<T> {
    uniqueKey: string;
    item: T | null;
    jobStage: JobStage;
}

export interface IGithubRepoFetcherStatus extends IJobStatusUpdate<{ [index: string]: JobStage }> {
}

// =============================================================================== //
export interface ICalculateTagCountsStatus extends IJobStatusUpdate<IResult<Tag>> {
}

// =============================================================================== //
export type MapTagJobStatus = IJobStatusUpdate<IResult<Tag>>;

export interface IMapTagJobStatusLookup {
    [indexer: string]: MapTagJobStatus;
}

// =============================================================================== //
export type RenameTagJobStatus = IJobStatusUpdate<IResult<Tag>>;

export interface IRenameTagJobStatusLookup {
    [indexer: string]: RenameTagJobStatus;
}

// =============================================================================== //
export type DeleteTagJobStatus = IJobStatusUpdate<IResult<Tag["tagId"]>>;

export interface IDeleteTagJobStatusLookup {
    [indexer: string]: DeleteTagJobStatus;
}

// =============================================================================== //

// todo for the ones that are not lookups, make them lookups. there will just be 1 at a time.
export interface IJobStatusState {
    currentTagIdBeingMapped: Tag["tagId"] | null;
    githubRepoFetcherStatus: IGithubRepoFetcherStatus;
    calculateTagCountsStatus: ICalculateTagCountsStatus;
    mapTagStatus: IMapTagJobStatusLookup;
    renameTagStatus: IRenameTagJobStatusLookup;
}

const INITIAL_STATE: IJobStatusState = {
    calculateTagCountsStatus: {
        item: null,
        jobStage: JobStage.None,
        // todo not in use yet. restructure job status updates to use
        uniqueKey: "",
    },
    currentTagIdBeingMapped: null,
    githubRepoFetcherStatus: {
        item: {},
        jobStage: JobStage.None,
        // todo not in use yet. restructure job status updates to use
        uniqueKey: "",
    },
    mapTagStatus: {},
    renameTagStatus: {},
};

export const jobStatusReducer = (
    state = INITIAL_STATE,
    action: JobStatusUpdateActions | ISetCurrentTagIdBeingMappedAction | IMapTagJobDoneAction,
): IJobStatusState => {
    switch (action.type) {
        case MAP_TAG_JOB_DONE: {
            const { uniqueKey } = action.payload;
            return {
                ...state,
                mapTagStatus: {
                    ...state.mapTagStatus,
                    [uniqueKey]: action.payload,
                },
            };
        }
        case SET_CURRENT_TAG_ID_BEING_MAPPED: {
            return { ...state, currentTagIdBeingMapped: action.payload };
        }
        // =============================================================================== //
        // Triggered
        // =============================================================================== //
        case RENAME_TAG_LOADING: {
            const { uniqueKey } = action.payload;
            return {
                ...state,
                renameTagStatus: {
                    ...state.renameTagStatus,
                    [uniqueKey]: {
                        item: null,
                        jobStage: JobStage.InProgress,
                        uniqueKey,
                    },
                },
            };
        }
        case HANDLE_RENAME_TAG_JOB_STATUS_UPDATE: {
            const { jobStage, item, uniqueKey } = action.payload;
            if (uniqueKey) {
                return {
                    ...state,
                    renameTagStatus: { ...state.renameTagStatus, [uniqueKey]: { item, jobStage, uniqueKey } },
                };
            } else {
                return state;
            }
        }
        case MAP_TAG_LOADING: {
            const tagId = action.payload;
            return {
                ...state,
                mapTagStatus: {
                    ...state.mapTagStatus,
                    [tagId]: { jobStage: JobStage.InProgress, item: null, uniqueKey: tagId },
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
                        [uniqueKey]: { item, jobStage, uniqueKey },
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
