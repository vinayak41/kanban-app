import { combineReducers } from "redux";
import "@babel/polyfill";
import userReducer from "./userReducer";
import boardsReducer from "./boardsReducer";
import boardReducer from "./boardReducer";

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardsReducer,
  board: boardReducer
});

export default rootReducer;
