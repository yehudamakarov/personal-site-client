import {
    GET_PROJECT_BY_NAME_ERROR,
    GET_PROJECT_BY_NAME_LOADING,
    GET_PROJECT_BY_NAME_SUCCESS,
    GetProjectByNameActionsType,
} from "./actions/getProjectByName";
import {
    GET_PROJECTS_ERROR,
    GET_PROJECTS_LOADING,
    GET_PROJECTS_SUCCESS,
    GetProjectsActionTypes,
} from "./actions/getProjects";
import { IProjectsState } from "./types/IProjectsState";

const INITIAL_STATE: IProjectsState = {
    projectsData: [],
    projectsUi: {
        allIsError: false,
        allIsLoading: false,
        singleIsError: new Map<string, boolean>(),
        singleIsLoading: new Map<string, boolean>(),
    },
};

type ProjectsActionTypes = GetProjectByNameActionsType | GetProjectsActionTypes;

export const projectsReducer = (
    state = INITIAL_STATE,
    action: ProjectsActionTypes
): IProjectsState => {
    switch (action.type) {
        case GET_PROJECTS_LOADING:
            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    allIsError: false,
                    allIsLoading: true,
                },
            };
        case GET_PROJECTS_SUCCESS:
            return {
                projectsData: action.payload,
                projectsUi: {
                    ...state.projectsUi,
                    allIsError: false,
                    allIsLoading: false,
                },
            };
        case GET_PROJECTS_ERROR:
            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    allIsError: true,
                    allIsLoading: false,
                },
            };
        case GET_PROJECT_BY_NAME_ERROR:
            return state;
        case GET_PROJECT_BY_NAME_LOADING:
            return state;
        case GET_PROJECT_BY_NAME_SUCCESS:
            return state;
        default:
            return state;
    }
};
