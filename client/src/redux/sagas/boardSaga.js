import axios from "axios";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { BOARD_API, CARD_API, LIST_API } from "../../utils/api";
import { getToken } from "../../utils/helper";
import {
  setAllBoards,
  setBoard,
  setCard,
  setCreatedBoard,
  setList,
} from "../actions/boardActions";
import {
  CREATE_BOARD,
  CREATE_CARD,
  CREATE_LIST,
  GET_ALL_BOARDS,
  GET_BOARD,
  UPDATE_CARD_POSITION,
  UPDATE_LIST_POSITION,
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

function* createCard(action) {
  try {
    const token = yield call(getToken);
    const response = yield call(axios, {
      method: "POST",
      url: `${CARD_API}`,
      data: action.payload,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    yield put(setCard(response.data));
  } catch (error) {
    console.log(error);
  }
}

function* updateListPosition(action) {
  try {
    const token = yield call(getToken);
    const response = yield call(axios, {
      method: "PATCH",
      url: `${LIST_API}/${action.payload.listId}`,
      data: { position: action.payload.position },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function* updateCardPosition(action) {
  try {
    const token = yield call(getToken);
    const response = yield call(axios, {
      method: "PATCH",
      url: `${CARD_API}/${action.payload.cardId}`,
      data: {
        position: action.payload.position,
        sourceListId: action.payload.sourceListId,
        destinationListId: action.payload.destinationListId,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* boardSaga() {
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(GET_ALL_BOARDS, getAllBoards);
  yield takeEvery(GET_BOARD, getBoard);
  yield takeEvery(CREATE_LIST, createList);
  yield takeEvery(CREATE_CARD, createCard);
  yield takeEvery(UPDATE_LIST_POSITION, updateListPosition);
  yield takeEvery(UPDATE_CARD_POSITION, updateCardPosition);
}
