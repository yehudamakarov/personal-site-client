import { fork } from "redux-saga/effects";
import { watchRenameTagLoading } from "../../../logic/dashboard/tags/rename/saga";
import { watchGetTransferListFacades } from "./actions/sagas/getTransferListFacadesSaga";
import { watchMapTag } from "./actions/sagas/saveMappedTagsSaga";

export const transferListSagas = [fork(watchGetTransferListFacades), fork(watchMapTag), fork(watchRenameTagLoading)];
