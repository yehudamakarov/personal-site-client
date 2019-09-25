import { IPinnedRepository } from "./IPinnedRepository";
export interface IPinnedRepositoriesState {
    isLoading: boolean;
    isError: boolean;
    pinnedRepositories: IPinnedRepository[];
}
