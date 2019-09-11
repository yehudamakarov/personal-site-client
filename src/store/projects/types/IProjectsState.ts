import { IProject } from "./IProject";
export interface IProjectsState {
    projectsData: IProject[];
    projectsUi: IProjectsUi;
}

interface IProjectsUi {
    allIsLoading: boolean;
    allIsError: boolean;
    singleIsError: Map<string, boolean>;
    singleIsLoading: Map<string, boolean>;
}
