import { SET_BOARD } from "../actionTypeConstants/board";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD: {
      return action.payload;
    }
    default:
      return state;
  }
};
