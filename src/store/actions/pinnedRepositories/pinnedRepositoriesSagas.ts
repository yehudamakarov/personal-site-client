import { fork } from "redux-saga/effects";
import { watchGetPinnedRepositoriesRequest } from "./getPinnedRepositories/saga";

export const pinnedRepositoriesSagas = [
    fork(watchGetPinnedRepositoriesRequest),
];
