import { navigate } from "@reach/router";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { Routes } from "../../../../ui/IUiState";
import { ITokenResponse, loginApi } from "../api";
import { ILoginLoadingAction, LOGIN_LOADING, loginErrorAction, loginSuccessAction } from "./actions";

function* login(action: ILoginLoadingAction) {
    try {
        const { payload: credentials } = action;
        const response: AxiosResponse<ITokenResponse> = yield call(
            loginApi.login,
            credentials,
        );
        yield put(loginSuccessAction(response.data.data));
        navigate(Routes.home).then(() => null);
    } catch (error) {
        const errorContent = JSON.stringify(error.toJSON());
        yield put(loginErrorAction(errorContent));
    }
}

export function* watchLogin() {
    yield takeEvery(LOGIN_LOADING, login);
}
