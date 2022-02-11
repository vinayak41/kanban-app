import axios from "axios";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { BOARD_API } from "../../utils/api";
import { getToken } from "../../utils/helper";
import { setAllBoards, setCreatedBoard } from "../actions/boardActions";
import { CREATE_BOARD, GET_ALL_BOARDS } from "../actionTypeConstants/board";

function* createBoard(action) {
  try {
    const token = yield call(getToken);
    const response = yield call(axios, {
      method: "POST",
      url: `${BOARD_API}`,
      data: action.payload,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    yield put(setCreatedBoard(response.data));
  } catch (error) {
    console.log(error);
  }
}

function* getAllBoards(action) {
  try {
    const token = yield call(getToken);
    const response = yield call(axios, {
      method: "GET",
      url: `${BOARD_API}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    yield put(setAllBoards(response.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* boardSaga() {
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(GET_ALL_BOARDS, getAllBoards);
}
