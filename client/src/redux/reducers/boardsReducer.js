import {
  SET_ALL_BOARDS,
  SET_CREATED_BOARD,
} from "../actionTypeConstants/board";

const initialState = { all: [], current: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CREATED_BOARD:
      return {
        ...state,
        all: [...state.all, action.payload],
      };
    case SET_ALL_BOARDS:
      return {
        ...state,
        all: action.payload,
      };
    default:
      return state;
  }
};
