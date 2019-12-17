import { fork } from "redux-saga/effects";
import { watchGetTransferListFacades } from "./actions/sagas/getTransferListFacadesSaga";

export const transferListSagas = [fork(watchGetTransferListFacades)];
