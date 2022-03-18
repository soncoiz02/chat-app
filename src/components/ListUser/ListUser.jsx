import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createRoom, getRoomData } from '../../firebase/room'
import './listUser.scss'
const ListUser = () => {
    const userInfor = useSelector(state => state.user.infor)
    const onlineUsers = useSelector(state => state.user.onlineUsers)
    const navigate = useNavigate()

    const handleCheckRoom = async (roomId, recieveUser) => {
        const roomData = await getRoomData(roomId)
        if (roomData) {
            navigate(`/room/${roomId}`)
        }
        else {
            const roomData = {
                id: roomId,
                messages: [
                ],
                users: [
                    {
                        uid: userInfor.uid,
                        nickName: userInfor.fullname,
                        avatar: userInfor.avatar,
                        isOnline: userInfor.isOnline
                    },
                    {
                        uid: recieveUser.uid,
                        nickName: recieveUser.fullname,
                        avatar: recieveUser.avatar,
                        isOnline: recieveUser.isOnline
                    }
                ],
                colorTheme: {
                    primary: '#5555ff',
                    secondary: 'whitesmoke',
                    color: '#5555ff',
                    bg: '#f1fcff'
                }
            }
            await createRoom(roomId, roomData)
            navigate(`/room/${roomId}`)
        }
    }

    return (
        <div className='list'>
            {
                onlineUsers.length > 0 &&
                onlineUsers.map((e, index) =>
                    <div className="user" key={index}>
                        <div className="avt">
                            <img src={e.avatar} alt="" />
                        </div>
                        <div className="detail">
                            <div className="name">
                                {e.fullname}
                            </div>
                            {
                                e.isOnline === true ?
                                    <div className="status"><div className="dot"></div>Online</div>
                                    :
                                    <div className="status"><div className="dot off"></div>Offline</div>
                            }
                        </div>
                        <div
                            className='btn-send'
                            onClick={() => handleCheckRoom(Number(e.uid) + Number(userInfor.uid), e)}
                        >Send Message</div>
                    </div>
                )
            }
        </div>
    )
}

export default ListUser