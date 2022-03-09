import { combineReducers } from "redux";
import userReducers from "./user";

const rootReducers = combineReducers({
    user: userReducers
})

export default rootReducers