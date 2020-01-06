import { navigate } from "@reach/router";
import { EnhancedStore } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "../helpers/authHelpers";
import { logoutLoadingAction } from "./entities/auth/actions/logout/actions";
import { IApplicationState } from "./rootReducer";
import { Routes } from "./ui/IUiState";

export const configureAxios = (store: EnhancedStore<IApplicationState>) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const tokenInsertRequestHandler = axios.interceptors.request.use((config: AxiosRequestConfig) => {
        const token = getToken(store);
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    // todo move out
    const tokenExpiredResponseHandler = axios.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error: AxiosError) => {
            if (error.response && error.response.status) {
                switch (error.response.status) {
                    case 401: {
                        // todo set state for a login prompt
                        store.dispatch(logoutLoadingAction());
                        navigate(Routes.login).then(() => null);
                        break;
                    }
                    case 403: {
                        // todo set state for a login prompt
                        store.dispatch(logoutLoadingAction());
                        navigate(Routes.login).then(() => null);
                        break;
                    }
                    default:
                        break;
                }
            }

            return Promise.reject(error);
        },
    );
};
