import { IProject } from "./IProject";
export interface IProjectsState {
    projectsData: IProject[];
    projectsUi: IProjectsUi;
}

interface IErrorMap {
    [index: string]: boolean;
}

interface IProjectsUi {
    allIsLoading: boolean;
    allIsError: boolean;
    singleIsError: IErrorMap;
    singleIsLoading: IErrorMap;
}
