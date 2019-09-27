import { all } from "redux-saga/effects";
import { blogPostSagas } from "./actions/blogPost/blogPostSagas";
import { pinnedRepositoriesSagas } from "./actions/pinnedRepositories/pinnedRepositoriesSagas";
import { projectSagas } from "./actions/projects/projectsSagas";

export function* rootSaga() {
    yield all([...projectSagas]);
    yield all([...pinnedRepositoriesSagas]);
    yield all([...blogPostSagas]);
}
