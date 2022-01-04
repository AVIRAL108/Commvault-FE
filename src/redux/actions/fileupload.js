import { ADD_FILES, FILE_UPLOAD, REMOVE_FILES } from "../constants/keys"

export const fileUpload  = (value) =>  dispatch  => { 
  return dispatch({
       type  : FILE_UPLOAD,
       payload :  value
   })
}

export const fileAdd  = (value) => dispatch => { 
  return dispatch({
    type  :  ADD_FILES,
    payload   :  value
  })
}

export const fileRemove  = () => dispatch => { 
  return dispatch({
    type  :  REMOVE_FILES,
  })
}