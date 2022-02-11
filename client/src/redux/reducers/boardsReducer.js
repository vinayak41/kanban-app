import {
  SET_ALL_BOARDS,
  SET_CREATED_BOARD,
} from "../actionTypeConstants/board";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CREATED_BOARD:
      return [...state, action.payload];
    case SET_ALL_BOARDS:
      return [...action.payload];
    default:
      return state;
  }
};
