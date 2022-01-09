import {  GET_JOBS_BY_SERVER_ID } from "../constants/keys";
const jobsReducer = (state = { list  : []}, action) => {
    switch (action.type) {
        case GET_JOBS_BY_SERVER_ID:
            return { ...state,  ...action.payload }
        default:
            return state;
    }
}
export default jobsReducer;