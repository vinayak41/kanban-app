import {
  SET_BOARD,
  SET_CARD,
  SET_LIST,
  UPDATE_LIST_POSITION,
} from "../actionTypeConstants/board";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD:
      return action.payload;
    case SET_LIST:
      return { ...state, lists: [...state.lists, action.payload] };
    case SET_CARD:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === action.payload.list
            ? { ...list, cards: [...list.cards, action.payload] }
            : list
        ),
      };
    case UPDATE_LIST_POSITION:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === action.payload.listId
            ? { ...list, position: action.payload.position }
            : list
        ),
      };
    default:
      return state;
  }
};
