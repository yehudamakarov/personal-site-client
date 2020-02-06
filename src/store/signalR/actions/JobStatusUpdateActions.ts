import { Tag } from "../../entities/tags/actions/api";
import { ICalculateTagCountsStatus, IGithubRepoFetcherStatus, MapTagJobStatus, RenameTagJobStatus } from "../reducer";
// =============================================================================== //
export const HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE = "HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE";
export interface IHandleGithubRepoFetcherJobStatusUpdateAction {
    type: typeof HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE;
    payload: IGithubRepoFetcherStatus;
}
export const handleGithubRepoFetcherJobStatusUpdateAction = (
    status: IGithubRepoFetcherStatus,
): IHandleGithubRepoFetcherJobStatusUpdateAction => ({
    payload: status,
    type: HANDLE_GITHUB_REPO_FETCHER_JOB_STATUS_UPDATE,
});
// =============================================================================== //
export const MAP_TAG_LOADING = "MAP_TAG_LOADING";
export interface IMapTagLoadingAction {
    type: typeof MAP_TAG_LOADING;
    payload: Tag["tagId"];
}
export const mapTagLoadingAction = (tagId: Tag["tagId"]): IMapTagLoadingAction => ({
    payload: tagId,
    type: MAP_TAG_LOADING,
});
// =============================================================================== //
export const HANDLE_MAP_TAG_JOB_STATUS_UPDATE = "HANDLE_MAP_TAG_JOB_STATUS_UPDATE";
export interface IHandleMapTagJobStatusUpdateAction {
    type: typeof HANDLE_MAP_TAG_JOB_STATUS_UPDATE;
    payload: MapTagJobStatus;
}
export const handleMapTagJobStatusUpdateAction = (status: MapTagJobStatus): IHandleMapTagJobStatusUpdateAction => ({
    payload: status,
    type: HANDLE_MAP_TAG_JOB_STATUS_UPDATE,
});
// =============================================================================== //
export const HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE = "HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE";
export interface IHandleCalculateTagCountsJobStatusUpdateAction {
    type: typeof HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE;
    payload: ICalculateTagCountsStatus;
}

export const handleCalculateTagCountsJobStatusUpdateAction = (
    status: ICalculateTagCountsStatus,
): IHandleCalculateTagCountsJobStatusUpdateAction => ({
    payload: status,
    type: HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE,
});
// =============================================================================== //
export const RENAME_TAG_LOADING = "RENAME_TAG_LOADING";
export interface IRenameTagLoadingAction {
    type: typeof RENAME_TAG_LOADING;
    payload: { uniqueKey: string; existingTagId: Tag["tagId"]; newTagId: Tag["tagId"] };
}
export const renameTagLoadingAction = (
    uniqueKey: string,
    existingTagId: Tag["tagId"],
    newTagId: Tag["tagId"],
): IRenameTagLoadingAction => ({
    payload: { uniqueKey, existingTagId, newTagId },
    type: RENAME_TAG_LOADING,
});
// =============================================================================== //
export const HANDLE_RENAME_TAG_JOB_STATUS_UPDATE = "HANDLE_RENAME_TAG_JOB_STATUS_UPDATE";
export interface IHandleRenameTagJobStatusUpdateAction {
    type: typeof HANDLE_RENAME_TAG_JOB_STATUS_UPDATE;
    payload: RenameTagJobStatus;
}
export const handleRenameTagJobStatusUpdateAction = (
    status: RenameTagJobStatus,
): IHandleRenameTagJobStatusUpdateAction => ({
    payload: status,
    type: HANDLE_RENAME_TAG_JOB_STATUS_UPDATE,
});
// =============================================================================== //

export type JobStatusUpdateActions =
    | IHandleRenameTagJobStatusUpdateAction
    | IRenameTagLoadingAction
    | IHandleGithubRepoFetcherJobStatusUpdateAction
    | IHandleCalculateTagCountsJobStatusUpdateAction
    | IHandleMapTagJobStatusUpdateAction
    | IMapTagLoadingAction;
