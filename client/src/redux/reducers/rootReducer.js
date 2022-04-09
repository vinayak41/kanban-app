import { combineReducers } from "redux";
import "@babel/polyfill";
import userReducer from "./userReducer";
import boardsReducer from "./boardsReducer";
import boardReducer from "./boardReducer";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardsReducer,
  board: boardReducer,
  card: cardReducer
});

export default rootReducer;
