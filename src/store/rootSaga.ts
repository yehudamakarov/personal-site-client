import { all } from "redux-saga/effects";
import { pinnedRepositoriesSagas } from "./pinnedRepositories/sagas";
import { projectSagas } from "./projects/sagas";

export function* rootSaga() {
    yield all([...projectSagas]);
    yield all([...pinnedRepositoriesSagas]);
}
