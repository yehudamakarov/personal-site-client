import { IPinnedRepository } from "./IPinnedRepository";
import { IResultDetails } from "./IResultDetails";
export interface IPinnedReposResponse {
    data: IPinnedRepository[];
    resultDetails: IResultDetails;
}
