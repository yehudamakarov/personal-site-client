import { all } from "redux-saga/effects";
import { blogPostSagas } from "./actions/blogPost/blogPostSagas";
import { pinnedRepositoriesSagas } from "./actions/pinnedRepositories/pinnedRepositoriesSagas";
import { projectSagas } from "./actions/projects/projectsSagas";
import { tagsSagas } from "./actions/tags/tagsSagas";

export function* rootSaga() {
    yield all([...tagsSagas]);
    yield all([...projectSagas]);
    yield all([...pinnedRepositoriesSagas]);
    yield all([...blogPostSagas]);
}
