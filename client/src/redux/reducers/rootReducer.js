import { combineReducers } from "redux";
import "@babel/polyfill";
import userReducer from "./userReducer";
import boardsReducer from "./boardsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardsReducer,
});

export default rootReducer;
