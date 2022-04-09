import {
  SET_BOARD,
  SET_CARD,
  SET_LIST,
  UPDATE_CARD_POSITION,
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
    case UPDATE_CARD_POSITION:
      let cardToMove = state.lists
        .find((list) => list._id === action.payload.sourceListId)
        .cards.find((card) => card._id === action.payload.cardId);
      cardToMove.position = action.payload.position;
      //remove card from sourceList and push into destination list
      return {
        ...state,
        lists:
          action.payload.sourceListId === action.payload.destinationListId
            ? state.lists.map((list) => {
              console.log(list._id === action.payload.sourceListId)
                return list._id === action.payload.sourceListId
                  ? {
                      ...list,
                      cards: list.cards
                        .map((card) =>
                          card._id === cardToMove._id
                            ? { ...card, position: action.payload.position }
                            : card
                        )
                    }
                  : list;
              })
            : state.lists.map((list) =>
                list._id === action.payload.sourceListId
                  ? {
                      ...list,
                      cards: list.cards.filter(
                        (card) => card._id !== action.payload.cardId
                      ),
                    }
                  : list._id === action.payload.destinationListId
                  ? { ...list, cards: [...list.cards, cardToMove] }
                  : list
              ),
      };

    default:
      return state;
  }
};
