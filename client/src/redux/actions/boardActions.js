import {
  CREATE_BOARD,
  GET_ALL_BOARDS,
  GET_BOARD,
  SET_ALL_BOARDS,
  SET_BOARD,
  SET_CREATED_BOARD,
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
