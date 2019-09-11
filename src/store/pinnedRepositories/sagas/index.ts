import { fork } from "redux-saga/effects";
import { watchGetPinnedRepositoriesRequest } from "./getPinnedRepositoriesSaga";

export const pinnedRepositoriesSagas = [
    fork(watchGetPinnedRepositoriesRequest),
];
