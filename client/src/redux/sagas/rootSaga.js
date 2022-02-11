import { fork, all } from "redux-saga/effects";
import userSaga from "./userSaga";
import boardSaga from "./boardSaga";

export default function* rootSaga() {
  yield all([fork(userSaga)]);
  yield all([fork(boardSaga)]);
}
