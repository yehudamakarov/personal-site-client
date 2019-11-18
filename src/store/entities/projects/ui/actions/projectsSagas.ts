import { fork } from "redux-saga/effects";
import { watchGetProjectByName } from "../../data/actions/getProjectByName/saga";
import { watchGetProjects } from "../../data/actions/getProjects/saga";
import { watchUpdateProject } from "./updateProject/saga";

export const projectSagas = [
    fork(watchGetProjectByName),
    fork(watchGetProjects),
    fork(watchUpdateProject),
];
