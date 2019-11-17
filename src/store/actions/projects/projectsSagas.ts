import { fork } from "redux-saga/effects";
import { watchGetProjectByName } from "./data/getProjectByName/saga";
import { watchGetProjects } from "./data/getProjects/saga";

export const projectSagas = [
    fork(watchGetProjectByName),
    fork(watchGetProjects),
];
