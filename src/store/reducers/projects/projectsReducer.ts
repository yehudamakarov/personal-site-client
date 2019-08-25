import { ProjectsActionTypes, GET_PROJECTS_SUCCESS, GET_PROJECTS_LOADING, GET_PROJECTS_ERROR } from "../../actions/projects/projectsActions";

export interface Project {

}

const INITIAL_STATE: ProjectsState = {
    projects: []
}
export interface ProjectsState {
    projects: Project[]
}

export const projectsReducer = (state = INITIAL_STATE, action: ProjectsActionTypes): ProjectsState => {
    switch (action.type) {
        case GET_PROJECTS_LOADING:
            return state;
        case GET_PROJECTS_SUCCESS:
            return {
                projects: action.payload
            }
        case GET_PROJECTS_ERROR:
            return state;
        default:
            return state
    }
}