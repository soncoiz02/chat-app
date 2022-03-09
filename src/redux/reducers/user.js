const initialState = {
    infor: {}
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_INFOR":
            const infor = action.payload
            return {
                ...state,
                infor: infor
            }
        default:
            return state
    }
}

export default userReducers