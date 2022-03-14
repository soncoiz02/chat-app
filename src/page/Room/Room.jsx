import React, { useEffect, useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LissMessage from '../../components/ListMessage/LissMessage'
import MessForm from '../../components/MessForm/MessForm'
import { getRoomData } from '../../firebase/room'
import './room.scss'

const Room = () => {
    const currentUser = useSelector(state => state.user.infor)
    const recieveUser = useSelector(state => state.user.reciever)
    const roomId = useParams().id
    const [roomData, setRoomData] = useState()
    const [listMess, setListMess] = useState([])

    const [recieveUserNickname, setRecieveUserNickname] = useState('')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getRoomData(roomId)
        setRoomData(data)
        setListMess(data?.messages)
        const reciveUserNickname = data?.users?.find(e => e.uid === recieveUser.uid)?.nickName
        setRecieveUserNickname(reciveUserNickname)
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
                    <div className="btn-infor">
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
                <div className="setting-box"></div>
            </div>
        </div>
    )
}

export default Room