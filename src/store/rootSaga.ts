import { all } from "redux-saga/effects";
import { blogPostSagas } from "./blogPost/blogPostSagas";
import { pinnedRepositoriesSagas } from "./pinnedRepositories/pinnedRepositoriesSagas";
import { projectSagas } from "./projects/projectsSagas";

export function* rootSaga() {
    yield all([...projectSagas]);
    yield all([...pinnedRepositoriesSagas]);
    yield all([...blogPostSagas]);
}
