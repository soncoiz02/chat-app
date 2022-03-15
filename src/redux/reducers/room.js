const initialState = {
    theme: {}
}

const roomReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_THEME":
            const theme = action.payload
            return {
                ...state,
                theme: theme
            }
        default:
            return state
    }
}

export default roomReducers