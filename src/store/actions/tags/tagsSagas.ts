import { fork } from "redux-saga/effects";
import { watchGetTags } from "./getTags/saga";

export const tagsSagas = [fork(watchGetTags)];