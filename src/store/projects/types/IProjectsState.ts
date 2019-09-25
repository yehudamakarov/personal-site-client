import { IBaseCollectionUiState } from "../../general/types/IBaseCollectionUiState";
import { IProject } from "./IProject";
export interface IProjectsState {
    projectsData: IProject[];
    projectsUi: IProjectsUi;
}

type IProjectsUi = IBaseCollectionUiState;
