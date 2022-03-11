import app from "./firebaseConfig";
import { child, get, getDatabase, onValue, ref, set, update } from 'firebase/database'
import { async } from "@firebase/util";
const db = getDatabase(app)

export const addRoomData = async (roomId, data) => {
    const roomRef = ref(db, 'rooms/' + roomId)
    await set(roomRef, data)
}

export const getRoomData = async (roomId) => {
    const dbRef = ref(db)
    const snapshot = await get(child(dbRef, `rooms/${roomId}`))
    return snapshot.val()
}


export const example = async () => {
    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            console.log("connected");
        } else {
            console.log("not connected");
        }
    });
}

export const addMess = async (roomId, data) => {
    const dbRef = ref(db, `rooms/${roomId}/messages`)
    await set(dbRef, data)
}


export const deleteMess = async (roomId, index, uid) => {
    const dbRef = ref(db, `rooms/${roomId}/messages/${index}`)
    await set(dbRef, { sender: uid, content: "This message has been removed" })
}