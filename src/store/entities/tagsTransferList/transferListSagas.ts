import { fork } from "redux-saga/effects";
import { watchDeleteTag } from "../../../logic/dashboard/tags/delete";
import { watchRenameTagLoading } from "../../../logic/dashboard/tags/rename";
import { watchGetTransferListFacades } from "./actions/sagas/getTransferListFacadesSaga";
import { watchMapTag } from "./actions/sagas/saveMappedTagsSaga";

export const transferListSagas = [fork(watchGetTransferListFacades), fork(watchMapTag), fork(watchRenameTagLoading), fork(watchDeleteTag)];
