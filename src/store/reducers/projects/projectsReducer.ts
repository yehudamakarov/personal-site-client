import { ProjectsActionTypes, GET_PROJECTS_SUCCESS, GET_PROJECTS_LOADING, GET_PROJECTS_ERROR } from "../../actions/projects/projectsActions";

export interface Project {
    databaseId: string;
    timeFetched: string;
    current: boolean;
    name: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

const INITIAL_STATE: ProjectsState = {
    isLoading: false,
    isError: false,
    projects: []
}
export interface ProjectsState {
    isLoading: boolean;
    isError: boolean;
    projects: Project[];
}

export const projectsReducer = (state = INITIAL_STATE, action: ProjectsActionTypes): ProjectsState => {
    switch (action.type) {
        case GET_PROJECTS_LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case GET_PROJECTS_SUCCESS:
            return {
                isLoading: false,
                isError: false,
                projects: action.payload
            }
        case GET_PROJECTS_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false
            };
        default:
            return state
    }
}