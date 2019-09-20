import { fork } from "redux-saga/effects";
import { watchGetProjectByName } from "./getProjectByNameSaga";
import { watchGetProjects } from "./getProjectsSaga";

export const projectSagas = [
    fork(watchGetProjectByName),
    fork(watchGetProjects),
];
