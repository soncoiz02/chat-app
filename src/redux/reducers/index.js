import { combineReducers } from "redux";
import roomReducers from "./room";
import userReducers from "./user";

const rootReducers = combineReducers({
    user: userReducers,
    room: roomReducers
})

export default rootReducers