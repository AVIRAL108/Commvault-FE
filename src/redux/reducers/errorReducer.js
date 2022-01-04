import { CLEAR_ERROR, CRUD_ERROR } from "../constants/keys";

const errorReducer = (state = {}, action) => {
    switch (action.type) {
        case CRUD_ERROR:
            return  { ...state, ...action.payload    }
        case CLEAR_ERROR: 
           return  null
         default: 
           return state   
    }
}
export default errorReducer;