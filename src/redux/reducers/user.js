const initialState = {
    infor: {},
    reciever: {}
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
        default:
            return state
    }
}

export default userReducers