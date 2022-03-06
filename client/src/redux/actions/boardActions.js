import {
  CREATE_BOARD,
  CREATE_CARD,
  CREATE_LIST,
  GET_ALL_BOARDS,
  GET_BOARD,
  SET_ALL_BOARDS,
  SET_BOARD,
  SET_CARD,
  SET_CREATED_BOARD,
  SET_LIST,
  UPDATE_CARD_POSITION,
  UPDATE_LIST_POSITION,
} from "../actionTypeConstants/board";

export const createBoard = (boardData) => {
  console.log(boardData);
  return {
    type: CREATE_BOARD,
    payload: boardData,
  };
};

export const setCreatedBoard = (data) => {
  return {
    type: SET_CREATED_BOARD,
    payload: data,
  };
};

export const getAllBoards = () => {
  return {
    type: GET_ALL_BOARDS,
  };
};

export const setAllBoards = (boards) => {
  return {
    type: SET_ALL_BOARDS,
    payload: boards,
  };
};

export const getBoard = (boardId) => {
  return {
    type: GET_BOARD,
    payload: boardId,
  };
};

export const setBoard = (board) => {
  return {
    type: SET_BOARD,
    payload: board,
  };
};

export const createList = (list) => {
  return {
    type: CREATE_LIST,
    payload: list,
  };
};

export const setList = (list) => {
  return {
    type: SET_LIST,
    payload: list,
  };
};

export const createCard = (data) => {
  return {
    type: CREATE_CARD,
    payload: data,
  };
};

export const setCard = (card) => {
  return {
    type: SET_CARD,
    payload: card,
  };
};

export const updateListPositon = (listId, position) => {
  return {
    type: UPDATE_LIST_POSITION,
    payload: { listId, position },
  };
};

export const updateCardPosition = (
  cardId,
  sourceListId,
  destinationListId,
  position
) => {
  return {
    type: UPDATE_CARD_POSITION,
    payload: { cardId, sourceListId, destinationListId, position },
  };
};
