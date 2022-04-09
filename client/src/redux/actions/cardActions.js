import {
  CLOSE_CARD_NAME_EDITOR,
  OPEN_CARD_NAME_EDITOR,
  UPDATE_CARD,
} from "../actionTypeConstants/card";

export const openNameEditor = ({ card, position }) => {
  return {
    type: OPEN_CARD_NAME_EDITOR,
    payload: { card, position },
  };
};

export const closeCardNameEditor = () => {
  return {
    type: CLOSE_CARD_NAME_EDITOR,
  };
};

export const updateCard = (data) => {
  return {
    type: UPDATE_CARD,
    payload: data,
  };
};
