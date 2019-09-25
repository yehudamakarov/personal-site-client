import { IResultDetails } from "./IResultDetails";
export interface IApiResponse<T> {
    data: T;
    resultDetails: IResultDetails;
}
