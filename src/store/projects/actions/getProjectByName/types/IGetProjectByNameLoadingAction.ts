import { GET_PROJECT_BY_NAME_LOADING } from "../index";
export interface IGetProjectByNameLoadingAction {
    type: typeof GET_PROJECT_BY_NAME_LOADING;
    payload?: string;
}
