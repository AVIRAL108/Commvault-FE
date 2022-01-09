import _ from "lodash";
import { GET_DATA, POST_DATA } from "../constants/keys";
const crudReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_DATA:
            return state
        case GET_DATA:
             return { ...state,  [action.name] : { rowCount  : parseInt(action.payload?.rowsCount), list  :   _.mapKeys(action.payload.list, "id") }}
        default:
            return state;
    }
}
export default crudReducer;