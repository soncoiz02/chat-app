import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaExclamationCircle, FaPaperPlane } from 'react-icons/fa'
import './room.scss'
import { useParams } from 'react-router-dom'
import { addMess, addRoomData, example, getRoomData } from '../../firebase/room'
import LissMessage from '../../components/ListMessage/LissMessage'

const Room = () => {
    const currentUser = useSelector(state => state.user.infor)
    const recieveUser = useSelector(state => state.user.reciever)
    const roomId = useParams().id
    const [messVal, setMessVal] = useState('')
    const [roomData, setRoomData] = useState()
    const [listMess, setListMess] = useState([])

    useEffect(() => {
        getData()
    }, [roomData])

    const getData = async () => {
        const data = await getRoomData(roomId)
        setRoomData(data)
        if (roomData) {
            setListMess(roomData.messages)
        }
    }

    const handleSendMess = async (e) => {
        e.preventDefault()
        if (messVal !== '') {
            if (roomData) {
                const newMess = {
                    sender: currentUser.uid,
                    content: messVal
                }
                listMess.push(newMess)
                await addMess(roomId, listMess)
            }
            else {
                const data = {
                    messages: [
                        {
                            sender: currentUser.uid,
                            content: messVal
                        }
                    ],
                    users: [
                        {
                            uid: currentUser.uid,
                            nickName: currentUser.fullname
                        },
                        {
                            uid: recieveUser.uid,
                            nickName: recieveUser.fullname
                        }
                    ],
                    colorTheme: "blue"
                }
                addRoomData(roomId, data)
            }
            setMessVal('')
        }
    }

    return (
        <div className='message-room'>
            <div className="chat-box">
                <div className="header">
                    <div className="user">
                        <div className="avt">
                            <img src={recieveUser.avatar} alt="" />
                        </div>
                        <div className="detail">
                            <div className="name">{recieveUser.fullname}</div>
                            <div className="status"><div className="dot"></div>Online</div>
                        </div>
                    </div>
                    <div className="btn-infor">
                        <FaExclamationCircle />
                    </div>
                </div>
                <div className="main-content">
                    <LissMessage data={roomData?.messages} currentUserId={currentUser.uid} />
                    <form action="" className="form" onSubmit={(e) => handleSendMess(e)}>
                        <input
                            type="text"
                            value={messVal}
                            onChange={(e) => setMessVal(e.target.value)}
                            placeholder='Write something'
                        />
                        <button type='submit'>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
                <div className="setting-box"></div>
            </div>
        </div>
    )
}

export default Room