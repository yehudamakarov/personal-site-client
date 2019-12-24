import { all } from "redux-saga/effects";
import { authSagas } from "./entities/auth/actions/authSagas";
import { blogPostSagas } from "./entities/blogPost/actions/blogPostSagas";
import { pinnedRepositoriesSagas } from "./entities/pinnedRepositories/actions/pinnedRepositoriesSagas";
import { projectSagas } from "./entities/projects/ui/actions/projectsSagas";
import { tagsSagas } from "./entities/tags/actions/tagsSagas";
import { transferListSagas } from "./entities/tagsTransferList/transferListSagas";

export function* rootSaga() {
    yield all([...tagsSagas]);
    yield all([...projectSagas]);
    yield all([...pinnedRepositoriesSagas]);
    yield all([...blogPostSagas]);
    yield all([...authSagas]);
    yield all([...transferListSagas]);
}
