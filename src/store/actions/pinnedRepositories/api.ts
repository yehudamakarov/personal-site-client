import axios from "axios";
import { IApiResponse } from "../../baseTypes/IApiResponse";

export type IPinnedReposResponse = IApiResponse<IPinnedRepository[]>;

export interface IPinnedRepository {
    databaseId: string;
    timeFetched: string;
    current: boolean;
    name: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export const pinnedRepositoriesApi = {
    getPinnedRepositoriesRequest: () =>
        axios.get<IPinnedReposResponse>(
            `${process.env.REACT_APP_API_URL}repos/pinnedrepos`
        ),
};
