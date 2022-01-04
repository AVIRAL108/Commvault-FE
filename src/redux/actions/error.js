import { CLEAR_ERROR, CRUD_ERROR } from "../constants/keys"

export const clearError  = () => dispatch => { 
    return dispatch({
        type  :  CLEAR_ERROR
    })
}

export const apiError = (error) => async dispatch => { 
    await dispatch({ 
         type  :  CRUD_ERROR,
         payload  :  error
    })
}