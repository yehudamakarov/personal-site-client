import { all } from "redux-saga/effects";
import { pinnedRepositoriesSagas } from "./pinnedRepositories/sagas";
export function* rootSaga() {
    yield all([...pinnedRepositoriesSagas]);
}
