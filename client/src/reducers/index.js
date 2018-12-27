import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { authReducer } from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  // auth state produced by authReducer
  auth: authReducer,
  // form state produced by reduxForm
  form: formReducer,
  // surveys state produced by surveysReducer
  surveys: surveysReducer
});
