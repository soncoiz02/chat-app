import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaExclamationCircle, FaPaperPlane } from 'react-icons/fa'
import './room.scss'

const Room = () => {
    const currentUser = useSelector(state => state.user.infor)
    const recieveUser = useSelector(state => state.user.reciever)
    const [messVal, setMessVal] = useState('')

    const handleSendMess = (e) => {
        e.preventDefault()
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
                    <div className="list-mess">
                        <p className="mess sender">dsadasdsad</p>
                        <p className="mess reciever">dsadasdsad</p>
                    </div>
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