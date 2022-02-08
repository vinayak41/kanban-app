import { combineReducers } from "redux";
import "@babel/polyfill";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
