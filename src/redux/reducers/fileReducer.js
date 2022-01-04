import { ADD_FILES, FILE_UPLOAD, REMOVE_FILES } from "../constants/keys";
const fileReducer = (state = {}, action) => {
    switch (action.type) {
        case FILE_UPLOAD:
            return { ...state, ...action.payload }
        case ADD_FILES:
             return { ...state, ...action.payload }    

         case REMOVE_FILES :
             return {}
        default:
            return state;
    }
}
export default fileReducer;