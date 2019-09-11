import axios from "axios";
import { IResultDetails } from "../../pinnedRepositories/types";
import { IProject } from "../types";

interface IProjectResponse {
    data: IProject;
    resultDetails: IResultDetails;
}
export const projectsApi = {
    getProjectById: (projectId: string) =>
        axios.get<IProjectResponse>(
            `${process.env.REACT_APP_API_URL}projects/projectByName`,
            { params: { projectId } }
        ),
    getProjectByName: (projectName: string) =>
        axios.get<IProjectResponse>(
            `${process.env.REACT_APP_API_URL}projects/projectByName`,
            { params: { projectName } }
        ),
};
