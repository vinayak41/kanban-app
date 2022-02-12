import { SET_BOARD, SET_LIST } from "../actionTypeConstants/board";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD:
      return action.payload;
    case SET_LIST:
      return { ...state, lists: [...state.lists, action.payload] };
    default:
      return state;
  }
};
