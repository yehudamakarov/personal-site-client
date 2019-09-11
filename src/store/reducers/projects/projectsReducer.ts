import {
    GET_PROJECTS_ERROR,
    GET_PROJECTS_LOADING,
    GET_PROJECTS_SUCCESS,
    ProjectsActionTypes,
} from "../../actions/projects/projectsActions";

export interface IProject {
    databaseId: string;
    timeFetched: string;
    current: boolean;
    name: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

const INITIAL_STATE: IProjectsState = {
    isLoading: false,
    isError: false,
    projects: [],
};
export interface IProjectsState {
    isLoading: boolean;
    isError: boolean;
    projects: IProject[];
}

export const projectsReducer = (state = INITIAL_STATE, action: ProjectsActionTypes): IProjectsState => {
    switch (action.type) {
        case GET_PROJECTS_LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case GET_PROJECTS_SUCCESS:
            return {
                isLoading: false,
                isError: false,
                projects: action.payload,
            };
        case GET_PROJECTS_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
};
