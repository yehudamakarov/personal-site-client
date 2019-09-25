import axios, { AxiosResponse } from "axios";
import { IApiResponse } from "../../general/types/IApiResponse";
import { IPinnedRepository, IResultDetails } from "../types";

export type IPinnedReposResponse = IApiResponse<IPinnedRepository[]>;

export const pinnedRepositoriesApi = {
    getPinnedRepositoriesRequest: () =>
        axios.get<IPinnedReposResponse>(
            `${process.env.REACT_APP_API_URL}repos/pinnedrepos`
        ),
};
