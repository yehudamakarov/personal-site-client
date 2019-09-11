import { GET_PINNED_REPOSITORIES_SUCCESS } from "..";
import { IPinnedRepository } from "../../../types/IPinnedRepository";
export interface IGetPinnedRepositoriesSuccessAction {
    type: typeof GET_PINNED_REPOSITORIES_SUCCESS;
    payload: IPinnedRepository[];
}
