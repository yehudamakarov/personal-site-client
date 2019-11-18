import { IBaseCollectionUiState } from "../../../../baseTypes/IBaseCollectionUiState";
import {
    GET_PROJECT_BY_NAME_ERROR,
    GET_PROJECT_BY_NAME_LOADING,
    GET_PROJECT_BY_NAME_SUCCESS,
    GetProjectByNameActionsType,
} from "../../data/actions/getProjectByName/actions";
import {
    GET_PROJECTS_ERROR,
    GET_PROJECTS_LOADING,
    GET_PROJECTS_SUCCESS,
    GetProjectsActionTypes,
} from "../../data/actions/getProjects/actions";
import { IProject } from "./api";
import {
    EDIT_PROJECT_DEPLOYMENT_URL,
    EditProjectDeploymentUrlActionTypes,
} from "./editProject/editProjectDeploymentUrl/actions";
import { EDIT_PROJECT_TAGS_IDS, EditProjectTagIdsActionTypes } from "./editProject/editProjectTags/actions";
import {
    SET_ANY_PROJECT_IS_EDITABLE,
    SET_ANY_PROJECT_IS_NOT_EDITABLE,
    SetAnyProjectIsEditableActionTypes,
} from "./setAnyProjectIsEditable/actions";
import { UPDATE_PROJECT_LOADING, UPDATE_PROJECT_SUCCESS, UpdateProjectActionTypes } from "./updateProject/actions";

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
    | SetAnyProjectIsEditableActionTypes
    | EditProjectDeploymentUrlActionTypes
    | EditProjectTagIdsActionTypes
    | UpdateProjectActionTypes;

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

        case SET_ANY_PROJECT_IS_NOT_EDITABLE: {
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

        case UPDATE_PROJECT_LOADING: {
            const projectId = action.payload.githubRepoDatabaseId;
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

        case UPDATE_PROJECT_SUCCESS: {
            const updatedProject = action.payload;
            const projectToUpdateIndex = state.projectsData.findIndex(
                (project) =>
                    project.githubRepoDatabaseId ===
                    updatedProject.githubRepoDatabaseId,
            );
            return {
                ...state,
                projectsData: [
                    ...state.projectsData.slice(0, projectToUpdateIndex),
                    updatedProject,
                    ...state.projectsData.slice(projectToUpdateIndex + 1),
                ],
            };
        }

        case EDIT_PROJECT_DEPLOYMENT_URL: {
            const { projectDeploymentUrl, projectId } = action.payload;

            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    editableProjects: {
                        ...state.projectsUi.editableProjects,
                        [projectId]: {
                            ...state.projectsUi.editableProjects[projectId],
                            deploymentUrl: projectDeploymentUrl,
                        },
                    },
                },
            };
        }
        case EDIT_PROJECT_TAGS_IDS: {
            const { projectId, projectTagIds } = action.payload;

            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    editableProjects: {
                        ...state.projectsUi.editableProjects,
                        [projectId]: {
                            ...state.projectsUi.editableProjects[projectId],
                            tagIds: projectTagIds,
                        },
                    },
                },
            };
        }

        default:
            return state;
    }
};
