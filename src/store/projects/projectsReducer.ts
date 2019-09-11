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
        singleIsError: {},
        singleIsLoading: {},
    },
};

type ProjectsActionTypes = GetProjectByNameActionsType | GetProjectsActionTypes;

export const projectsReducer = (
    state = INITIAL_STATE,
    action: ProjectsActionTypes
): IProjectsState => {
    switch (action.type) {
        case GET_PROJECTS_LOADING: {
            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    allIsError: false,
                    allIsLoading: true,
                },
            };
        }
        case GET_PROJECTS_SUCCESS: {
            return {
                projectsData: action.payload,
                projectsUi: {
                    ...state.projectsUi,
                    allIsError: false,
                    allIsLoading: false,
                },
            };
        }
        case GET_PROJECTS_ERROR: {
            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    allIsError: true,
                    allIsLoading: false,
                },
            };
        }
        case GET_PROJECT_BY_NAME_ERROR: {
            const erroredProjectId = action.payload.projectName;
            const errorMap = { ...state.projectsUi.singleIsError };
            if (erroredProjectId) {
                errorMap[erroredProjectId] = true;
            }

            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    singleIsError: errorMap,
                },
            };
        }
        case GET_PROJECT_BY_NAME_LOADING: {
            const projectName = action.payload;
            const loadingMap = { ...state.projectsUi.singleIsLoading };
            if (projectName) {
                loadingMap[projectName] = true;
            }

            const newState = {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    singleIsLoading: loadingMap,
                },
            };
            return newState;
        }
        case GET_PROJECT_BY_NAME_SUCCESS: {
            const projects = state.projectsData;
            const incomingProject = action.payload.data;
            const incomingProjectName = incomingProject.projectName;
            const errorMap = { ...state.projectsUi.singleIsError };
            const loadingMap = { ...state.projectsUi.singleIsLoading };

            delete errorMap[incomingProjectName];
            delete loadingMap[incomingProjectName];

            const projectAlreadyInState = projects.some((project) => {
                return (
                    project.githubRepoDatabaseId ===
                    incomingProject.githubRepoDatabaseId
                );
            });
            if (projectAlreadyInState) {
                return state;
            } else {
                return {
                    ...state,
                    projectsData: [...state.projectsData, incomingProject],
                    projectsUi: {
                        ...state.projectsUi,
                        singleIsError: errorMap,
                        singleIsLoading: loadingMap,
                    },
                };
            }
        }

        default:
            return state;
    }
};
