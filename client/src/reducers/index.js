import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import { authReducer } from "./authReducer";

export default combineReducers({
  // auth state produced by authReducer
  auth: authReducer,
  // form state produced by reduxForm
  form: reduxForm
});
