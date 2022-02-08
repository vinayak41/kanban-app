import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
} from "../actionTypeConstants/user";

export const loginRequest = (data) => {
  return {
    type: LOGIN_REQUEST,
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailed = (data) => {
  return {
    type: LOGIN_FAILED,
    payload: data,
  };
};
export const signupRequest = (data) => {
  return {
    type: SIGNUP_REQUEST,
    payload: data,
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signupFailed = (data) => {
  return {
    type: SIGNUP_FAILED,
    payload: data,
  };
};
