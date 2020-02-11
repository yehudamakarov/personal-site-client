import { fork } from "redux-saga/effects";
import { watchRenameTagLoading } from "../../../logic/dashboard/tags/rename";
import { watchGetTransferListFacades } from "./actions/sagas/getTransferListFacadesSaga";
import { watchMapTag } from "./actions/sagas/saveMappedTagsSaga";

export const transferListSagas = [fork(watchGetTransferListFacades), fork(watchMapTag), fork(watchRenameTagLoading)];
