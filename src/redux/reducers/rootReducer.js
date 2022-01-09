import { combineReducers } from "redux";
import crudReducer from "./crudReducer";
import errorReducer from "./errorReducer";
import jobsReducer from "./jobsReducer";

export default combineReducers({
  crud: crudReducer,
  error: errorReducer,
  jobs: jobsReducer,
});
