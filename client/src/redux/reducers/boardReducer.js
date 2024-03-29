import {
  SET_BOARD,
  SET_CARD,
  SET_LIST,
  UPDATE_CARD_POSITION,
  UPDATE_LIST_POSITION,
  UPDATE_LIST_TITLE,
} from "../actionTypeConstants/board";
import { UPDATE_CARD } from "../actionTypeConstants/card";

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
          list.id === action.payload.list
            ? { ...list, cards: [...list.cards, action.payload] }
            : list
        ),
      };
    case UPDATE_LIST_POSITION:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? { ...list, position: action.payload.position }
            : list
        ),
      };
    case UPDATE_CARD_POSITION:
      let cardToMove = state.lists
        .find((list) => list.id === action.payload.sourceListId)
        .cards.find((card) => card.id === action.payload.cardId);
      cardToMove.position = action.payload.position;
      //remove card from sourceList and push into destination list
      return {
        ...state,
        lists:
          action.payload.sourceListId === action.payload.destinationListId
            ? state.lists.map((list) => {
                return list.id === action.payload.sourceListId
                  ? {
                      ...list,
                      cards: list.cards.map((card) =>
                        card.id === cardToMove.id
                          ? { ...card, position: action.payload.position }
                          : card
                      ),
                    }
                  : list;
              })
            : state.lists.map((list) =>
                list.id === action.payload.sourceListId
                  ? {
                      ...list,
                      cards: list.cards.filter(
                        (card) => card.id !== action.payload.cardId
                      ),
                    }
                  : list.id === action.payload.destinationListId
                  ? { ...list, cards: [...list.cards, cardToMove] }
                  : list
              ),
      };
    case UPDATE_CARD:
      const listId = action.payload.listId;
      const cardId = action.payload.id;
      return {
        ...state,
        lists: state.lists.map((list) => ({
          ...list,
          cards: list.cards.map((card) =>
            card.id === cardId ? { ...card, ...action.payload } : card
          ),
        })),
      };

    case UPDATE_LIST_TITLE:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? { ...list, title: action.payload.title }
            : list
        ),
      };
    default:
      return state;
  }
};
