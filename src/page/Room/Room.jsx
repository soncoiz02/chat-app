import React, { useEffect, useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LissMessage from '../../components/ListMessage/LissMessage'
import MessForm from '../../components/MessForm/MessForm'
import RoomInfor from '../../components/RoomInfor/RoomInfor'
import { getRoomData } from '../../firebase/room'
import { setTheme } from '../../redux/action/room'
import './room.scss'

const Room = () => {
    const currentUser = useSelector(state => state.user.infor)
    const recieveUser = useSelector(state => state.user.reciever)
    const roomTheme = useSelector(state => state.room.theme)
    const dispatch = useDispatch()

    const roomId = useParams().id
    const [roomData, setRoomData] = useState()
    const [listMess, setListMess] = useState([])
    const [activeRoomInfor, setActiveRoomInfor] = useState(false)
    const [recieveUserNickname, setRecieveUserNickname] = useState('')

    useEffect(() => {
        getData()
    }, [roomId])

    const getData = async () => {
        const data = await getRoomData(roomId)
        setRoomData(data)
        setListMess(data?.messages)
        dispatch(setTheme(data?.colorTheme))
        const reciveUserNickname = data?.users?.find(e => e.uid === recieveUser.uid)?.nickName
        setRecieveUserNickname(reciveUserNickname)
    }

    const style = { "--main-color": roomTheme.primary, "--sec-color": roomTheme.secondary, "--bg-color": roomTheme.bg, "--icon-color": roomTheme.color }

    return (
        <div className='message-room' style={style}>
            <div className="chat-box">
                <div className="header">
                    <div className="user">
                        <div className="avt">
                            <img src={recieveUser.avatar} alt="" />
                        </div>
                        <div className="detail">
                            <div className="name">
                                {recieveUserNickname !== '' ? recieveUserNickname : recieveUser.fullname}
                            </div>
                            {
                                recieveUser.isOnline === true ?
                                    <div className="status"><div className="dot"></div>Online</div>
                                    :
                                    <div className="status"><div className="dot off"></div>Offline</div>
                            }
                        </div>
                    </div>
                    <div className="btn-infor" onClick={() => setActiveRoomInfor(!activeRoomInfor)}>
                        <FaExclamationCircle />
                    </div>
                </div>
                <div className="main-content">
                    <LissMessage />
                    <MessForm
                        roomData={roomData}
                        roomId={roomId}
                        listMess={listMess}
                        currentUser={currentUser}
                        recieveUser={recieveUser}
                    />
                </div>
            </div>
            {
                activeRoomInfor &&
                <RoomInfor recieveUser={recieveUser} roomData={roomData} />
            }
        </div>
    )
}

export default Room