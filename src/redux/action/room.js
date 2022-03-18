export const setTheme = (data) => {
    return {
        type: "SET_THEME",
        payload: data
    }
}

export const setListMess = (data) => {
    return {
        type: "SET_LIST_MESS",
        payload: data
    }
}

export const setRoomUsers = (data) => {
    return {
        type: "SET_ROOM_USERS",
        payload: data
    }
}