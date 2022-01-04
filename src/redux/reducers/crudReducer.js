import _ from "lodash";
import { GET_PERCENTAGES, POST_PERCENTAGE } from "../constants/keys";
const crudReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_PERCENTAGE:
            return state
        case GET_PERCENTAGES:
             return { ...state,  [action.name] : { rowCount  : action.payload.data.rowcount, list  :   _.mapKeys(action.payload.data.list, "id") }}
        default:
            return state;
    }
}
export default crudReducer;