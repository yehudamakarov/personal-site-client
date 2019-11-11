import { IBaseCollectionUiState } from "../../baseTypes/IBaseCollectionUiState";
import { IProject } from "./api";
import {
    GET_PROJECT_BY_NAME_ERROR,
    GET_PROJECT_BY_NAME_LOADING,
    GET_PROJECT_BY_NAME_SUCCESS,
    GetProjectByNameActionsType,
} from "./data/getProjectByName/actions";
import {
    GET_PROJECTS_ERROR,
    GET_PROJECTS_LOADING,
    GET_PROJECTS_SUCCESS,
    GetProjectsActionTypes,
} from "./data/getProjects/actions";
import {
    SET_ANY_PROJECT_IS_DONE_EDITING,
    SET_ANY_PROJECT_IS_EDITABLE,
    SetAnyProjectIsEditableActionTypes,
} from "./ui/setAnyProjectIsEditable/actions";

export interface IProjectsState {
    projectsData: IProject[];
    projectsUi: IProjectsUi;
}

interface IProjectsUi extends IBaseCollectionUiState {
    singleIsEditing: { [index: string]: boolean };
    editableProjects: { [index: string]: IProject };
}

const INITIAL_STATE: IProjectsState = {
    projectsData: [],
    projectsUi: {
        allIsError: false,
        allIsLoading: false,
        editableProjects: {},
        singleIsEditing: {},
        singleIsError: {},
        singleIsLoading: {},
    },
};

type ProjectsActionTypes =
    | GetProjectByNameActionsType
    | GetProjectsActionTypes
    | SetAnyProjectIsEditableActionTypes;

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
                return {
                    ...state,
                    projectsUi: {
                        ...state.projectsUi,
                        singleIsError: errorMap,
                        singleIsLoading: loadingMap,
                    },
                };
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

        case SET_ANY_PROJECT_IS_EDITABLE: {
            const projectId = action.payload;
            const projectToEdit = state.projectsData.find(
                (project) => project.githubRepoDatabaseId === projectId
            );
            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    editableProjects: {
                        ...state.projectsUi.editableProjects,
                        [projectId]: projectToEdit as IProject,
                    },
                    singleIsEditing: {
                        ...state.projectsUi.singleIsEditing,
                        [projectId]: true,
                    },
                },
            };
        }

        case SET_ANY_PROJECT_IS_DONE_EDITING: {
            const projectId = action.payload;
            const editableProjects = { ...state.projectsUi.editableProjects };
            delete editableProjects[projectId];
            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    editableProjects,
                    singleIsEditing: {
                        ...state.projectsUi.singleIsEditing,
                        [projectId]: false,
                    },
                },
            };
        }

        default:
            return state;
    }
};
