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
import { EDIT_PROJECT_TITLE, EditProjectTitleActionTypes } from "./editProject/editProjectTitle/actions";
import {
    SET_ANY_PROJECT_IS_EDITABLE,
    SET_ANY_PROJECT_IS_NOT_EDITABLE,
    SetAnyProjectIsEditableActionTypes,
} from "./setAnyProjectIsEditable/actions";
import {
    UPDATE_PROJECT_ERROR,
    UPDATE_PROJECT_LOADING,
    UPDATE_PROJECT_SUCCESS,
    UpdateProjectActionTypes,
} from "./updateProject/actions";

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
    | UpdateProjectActionTypes
    | EditProjectTitleActionTypes;

export const projectsReducer = (state = INITIAL_STATE, action: ProjectsActionTypes): IProjectsState => {
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

            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    singleIsLoading: loadingMap,
                },
            };
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
                return project.githubRepoDatabaseId === incomingProject.githubRepoDatabaseId;
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
            const projectToEdit = state.projectsData.find((project) => project.githubRepoDatabaseId === projectId);
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
            // todo take this editableProject out from here and put it in the success branch
            // clone object
            const editableProjects = { ...state.projectsUi.editableProjects };
            // delete from clone
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
                    singleIsLoading: { ...state.projectsUi.singleIsLoading, [projectId]: true },
                },
            };
        }
        case UPDATE_PROJECT_SUCCESS: {
            const updatedProject = action.payload;
            const projectId = updatedProject.githubRepoDatabaseId;
            const projectToUpdateIndex = state.projectsData.findIndex(
                (project) => project.githubRepoDatabaseId === updatedProject.githubRepoDatabaseId
            );
            return {
                ...state,
                projectsData: [
                    ...state.projectsData.slice(0, projectToUpdateIndex),
                    updatedProject,
                    ...state.projectsData.slice(projectToUpdateIndex + 1),
                ],
                projectsUi: {
                    ...state.projectsUi,
                    singleIsLoading: { ...state.projectsUi.singleIsLoading, [projectId]: false },
                },
            };
        }
        case UPDATE_PROJECT_ERROR: {
            // todo display error and make project not loading, rather make project errored. (key by projectId - it doesn't matter)
            return { ...state, projectsUi: { ...state.projectsUi } };
        }
        case EDIT_PROJECT_TITLE: {
            const { projectTitle, projectId } = action.payload;

            return {
                ...state,
                projectsUi: {
                    ...state.projectsUi,
                    editableProjects: {
                        ...state.projectsUi.editableProjects,
                        [projectId]: {
                            ...state.projectsUi.editableProjects[projectId],
                            projectTitle,
                        },
                    },
                },
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
