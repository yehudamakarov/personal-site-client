import axios from "axios";
import { IResult } from "../../../baseTypes/IResult";

export type ITokenData = string;

export type ITokenResponse = IResult<ITokenData>;

export interface ILoginRequest {
    firstName: string;
    lastName: string;
    password: string;
}

export const loginApi = {
    login: (credentials: ILoginRequest) =>
        axios.post<ITokenResponse>(
            `/authentication/login`,
            credentials,
        ),
};
