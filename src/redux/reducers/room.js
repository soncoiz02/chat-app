const initialState = {
    theme: {},
    roomUsers: [],
    listMess: []
}

const roomReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_THEME":
            const theme = action.payload
            return {
                ...state,
                theme: theme
            }
        case "SET_LIST_MESS":
            const listMess = action.payload
            return {
                ...state,
                listMess: listMess
            }
        case "SET_ROOM_USERS":
            const users = action.payload
            return {
                ...state,
                roomUsers: users
            }
        default:
            return state
    }
}

export default roomReducers