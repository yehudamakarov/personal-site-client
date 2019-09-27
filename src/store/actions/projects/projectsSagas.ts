import { fork } from "redux-saga/effects";
import { watchGetProjectByName } from "./getProjectByName/saga";
import { watchGetProjects } from "./getProjects/saga";

export const projectSagas = [
    fork(watchGetProjectByName),
    fork(watchGetProjects),
];
