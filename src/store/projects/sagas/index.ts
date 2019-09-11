import { fork } from "redux-saga/effects";
import { watchGetProjectByName } from "./getProjectByNameSaga";

export const projectSagas = [fork(watchGetProjectByName)];
