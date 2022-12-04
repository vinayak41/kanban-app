import {
  CLOSE_CARD_NAME_EDITOR,
  OPEN_CARD_NAME_EDITOR,
  UPDATE_CARD,
} from "../actionTypeConstants/card";

const initialState = {
  nameEditor: {
    isOpen: false,
    card: {
      listId: "",
      title: "",
      id: "",
    },
    position: {
      top: 0,
      left: 0,
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CARD_NAME_EDITOR:
      return {
        ...state,
        nameEditor: {
          isOpen: true,
          card: action.payload.card,
          position: action.payload.position,
        },
      };
    case CLOSE_CARD_NAME_EDITOR:
      return {
        ...state,
        nameEditor: initialState.nameEditor,
      };
    default:
      return state;
  }
};
