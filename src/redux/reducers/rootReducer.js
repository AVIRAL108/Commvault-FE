import { combineReducers } from 'redux';
import crudReducer from './crudReducer';
import fileReducer from './fileReducer';
import errorReducer from './errorReducer';


export default combineReducers({
   crud  :  crudReducer,
   files  : fileReducer,
   error  :  errorReducer
});