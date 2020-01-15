import axios from "axios";
import { IResult } from "../../../baseTypes/IResult";

export type IPinnedReposResponse = IResult<IPinnedRepository[]>;

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
            `/repos/pinnedrepos`,
        ),
};
