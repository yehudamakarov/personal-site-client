import axios from "axios";
import { IApiResponse } from "../../general/types/IApiResponse";
import { IResultDetails } from "../../pinnedRepositories/types";
import { IProject } from "../types";

export type IProjectResponse = IApiResponse<IProject>;
export type IProjectsResponse = IApiResponse<IProject[]>;

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
    getProjects: () => {
        return axios.get<IProjectsResponse>(
            `${process.env.REACT_APP_API_URL}projects/allProjects`
        );
    },
};
