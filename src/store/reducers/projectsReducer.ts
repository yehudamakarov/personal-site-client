import {
    GET_PROJECTS_ERROR,
    GET_PROJECTS_LOADING,
    GET_PROJECTS_SUCCESS,
    ProjectsActionTypes,
} from "../actions/projects/projectsActions";

export interface IProject {
    githubRepoDatabaseId: string;
    projectName: string;
    projectDescription: boolean;
    ProjectHighlights: IProjectHighlight[];
    ProjectPictures: IProjectPicture[];
}
export interface IProjectHighlight {
    HighlightDescription: string;
    HighlightLink: string;
}

export interface IProjectPicture {
    Description: string;
    Link: string;
}

const INITIAL_STATE: IProjectsState = {
    isError: false,
    isLoading: false,
    projects: [],
};

export interface IProjectsState {
    isLoading: boolean;
    isError: boolean;
    projects: IProject[];
}

export const projectsReducer = (
    state = INITIAL_STATE,
    action: ProjectsActionTypes
): IProjectsState => {
    switch (action.type) {
        case GET_PROJECTS_LOADING:
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        case GET_PROJECTS_SUCCESS:
            return {
                isError: false,
                isLoading: false,
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
