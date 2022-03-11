const initialState = {
    infor: {},
    reciever: {},
    onlineUsers: []
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_INFOR":
            const infor = action.payload
            return {
                ...state,
                infor: infor
            }
        case "SET_RECIEVER":
            const reciever = action.payload
            return {
                ...state,
                reciever: reciever
            }
        case "SET_ONLINE_USERS":
            const users = action.payload
            return {
                ...state,
                onlineUsers: users
            }
        default:
            return state
    }
}

export default userReducers