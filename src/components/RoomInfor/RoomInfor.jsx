import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeNickname, changeTheme } from '../../firebase/room'
import { setTheme } from '../../redux/action/room'
import './roomInfor.scss'

const listTheme = [
    {
        primary: '#5555ff',
        secondary: 'whitesmoke',
        color: '#5555ff',
        bg: '#f1fcff'
    },
    {
        primary: 'linear-gradient(45deg, #fe8dc6, #fed1c7)',
        secondary: 'white',
        color: '#ff6d86',
        bg: '#ffe9f8'
    },
    {
        primary: 'linear-gradient(45deg, #7f00ff, #e100ff)',
        secondary: 'white',
        color: 'mediumpurple',
        bg: '#fef6ff'
    },
    {
        primary: 'linear-gradient(45deg, #fbb040, #f9ed32)',
        secondary: 'white',
        color: 'orange',
        bg: '#fffae1'
    },
    {
        primary: 'linear-gradient(45deg, #00a1ff, #00ff8f)',
        secondary: 'whitesmoke',
        color: '#02c9d3',
        bg: '#f6fffa'
    },
    {
        primary: 'linear-gradient(45deg, #ee2a7b, #ff7db8)',
        secondary: 'white',
        color: '#ff6e9d',
        bg: '#fddcee'
    },
    {
        primary: 'linear-gradient(45deg, #ff004d, #00ddff)',
        secondary: 'white',
        color: 'orange',
        bg: '#ffe0c6'
    },
    {
        primary: 'linear-gradient(45deg, #ef4136, #fbb040)',
        secondary: 'white',
        color: 'orange',
        bg: '#e6fff1'
    },
    {
        primary: 'linear-gradient(45deg, #00e1fd, #fc007a)',
        secondary: 'white',
        color: '#b400ff',
        bg: '#eee6ff'
    }
]

const RoomInfor = ({ recieveUser, roomData, currentUser }) => {
    const roomId = useParams().id
    const dispatch = useDispatch()

    const [currentUserNickname, setCurrentUserNickname] = useState('')
    const [recieveUserNickname, setRecieveUserNickname] = useState('')

    useEffect(() => {
    }, [roomData])

    const handleChangeTheme = async (theme) => {
        await changeTheme(roomId, theme)
        dispatch(setTheme(theme))
    }

    const handleChangeNickname = async () => {
        if (currentUserNickname) {
            roomData.users.find(e => e.uid === currentUser.uid).nickName = currentUserNickname
        }
        if (recieveUserNickname) {
            roomData.users.find(e => e.uid !== currentUser.uid).nickName = recieveUserNickname
        }
        await changeNickname(roomId, roomData.users)
    }

    return (
        <div className='room-infor'>
            <div className="user">
                <div className="avt">
                    <img src={recieveUser?.avatar} alt="" />
                </div>
                <div className="name">{recieveUser?.nickName}</div>
            </div>
            <div className="setting">
                <div className="change">
                    <p><FaPen />Edit nicknames</p>
                    <div className="list-user">
                        <div className="item">
                            <div className="avt">
                                <img src={currentUser?.avatar} alt="" />
                            </div>
                            <input type="text"
                                value={currentUserNickname}
                                placeholder={currentUser?.nickName}
                                onChange={(e) => setCurrentUserNickname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="list-user">
                        <div className="item">
                            <div className="avt">
                                <img src={recieveUser?.avatar} alt="" />
                            </div>
                            <input
                                type="text"
                                value={recieveUserNickname}
                                placeholder={recieveUser?.nickName}
                                onChange={(e) => setRecieveUserNickname(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn-apply" onClick={handleChangeNickname}>Apply</button>
                </div>
                <div className="change">
                    <p><span className="circle"></span>Change theme</p>
                    <div className="list-theme">
                        {
                            listTheme.map((e, index) =>
                                <div
                                    className="theme"
                                    style={{ background: e.primary }}
                                    key={index}
                                    onClick={() => handleChangeTheme(e)}
                                ></div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomInfor