import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

export default combineReducers({
  // auth state produced by authReducer
  auth: authReducer
});
