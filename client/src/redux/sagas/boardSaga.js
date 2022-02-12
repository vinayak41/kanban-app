import axios from "axios";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { BOARD_API, LIST_API } from "../../utils/api";
import { getToken } from "../../utils/helper";
import {
  setAllBoards,
  setBoard,
  setCreatedBoard,
  setList,
} from "../actions/boardActions";
import {
  CREATE_BOARD,
  CREATE_LIST,
  GET_ALL_BOARDS,
  GET_BOARD,
} from "../actionTypeConstants/board";

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

function* getBoard(action) {
  try {
    const token = yield call(getToken);
    const response = yield call(axios, {
      method: "GET",
      url: `${BOARD_API}/${action.payload}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    yield put(setBoard(response.data));
  } catch (error) {
    console.log(error);
  }
}

function* createList(action) {
  try {
    const token = yield call(getToken);
    const response = yield call(axios, {
      method: "POST",
      url: `${LIST_API}`,
      data: action.payload,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    yield put(setList(response.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* boardSaga() {
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(GET_ALL_BOARDS, getAllBoards);
  yield takeEvery(GET_BOARD, getBoard);
  yield takeEvery(CREATE_LIST, createList);
}
