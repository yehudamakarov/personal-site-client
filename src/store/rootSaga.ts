import { all } from "redux-saga/effects";
import { blogPostSagas } from "./blogPost/sagas";
import { pinnedRepositoriesSagas } from "./pinnedRepositories/sagas";
import { projectSagas } from "./projects/sagas";

export function* rootSaga() {
    yield all([...projectSagas]);
    yield all([...pinnedRepositoriesSagas]);
    yield all([...blogPostSagas]);
}
