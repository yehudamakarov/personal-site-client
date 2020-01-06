import { IGithubRepoFetcherStatus } from "../reducer";
/* -------------------------------------------------------------------------- */
/*                          handleGithubRepoFetcherJobStatusUpdateAction      */
/* -------------------------------------------------------------------------- */

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
