import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { USER_API } from "../../utils/api";
import {
  loginFailed,
  loginSuccess,
  signupFailed,
  signupSuccess,
} from "../actions/userActions";
import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
} from "../actionTypeConstants/user";

function* login(action) {
  try {
    const response = yield call(axios, {
      method: "post",
      url: `${USER_API}/login`,
      data: action.payload,
    });
    yield put(loginSuccess(response.data));
    localStorage.setItem("kanban-user", JSON.stringify(response.data));
  } catch (error) {
    if (error.response?.data?.message) {
      yield put(loginFailed({message: error.response.data.message}));
    } else {
      yield put(loginFailed("login failed"));
    }
  }
}

function* signup(action) {
  try {
    const response = yield call(axios, {
      method: "post",
      url: `${USER_API}/register`,
      data: action.payload,
    });
    yield put(signupSuccess());
  } catch (error) {
    if (error.response?.data?.message) {
      yield put(signupFailed(error.response.data.message));
    } else {
      yield put(signupFailed("Signup failed"));
    }
  }
}

export default function* userSaga() {
  yield takeEvery(LOGIN_REQUEST, login);
  yield takeEvery(SIGNUP_REQUEST, signup);
}
