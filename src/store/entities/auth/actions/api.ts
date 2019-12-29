import axios from "axios";
import { IApiResponse } from "../../../baseTypes/IApiResponse";

export type ITokenData = string;

export type ITokenResponse = IApiResponse<ITokenData>;

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
