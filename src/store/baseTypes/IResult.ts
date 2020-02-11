import { IResultDetails } from "./IResultDetails";

export interface IResult<T> {
    data: T;
    details: IResultDetails;
}
