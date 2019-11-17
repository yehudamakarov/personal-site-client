import { fork } from "redux-saga/effects";
import { watchLogin } from "./login/saga";

export const authSagas = [fork(watchLogin)];
