import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setReciever } from '../../redux/action/user'
import './listUser.scss'
const ListUser = () => {
    const userInfor = useSelector(state => state.user.infor)
    const onlineUsers = useSelector(state => state.user.onlineUsers)
    const dispatch = useDispatch()

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
                        <Link
                            className='btn-send'
                            to={`/room/${Number(e.uid) + Number(userInfor.uid)}`}
                            onClick={() => dispatch(setReciever(onlineUsers[index]))}
                        >Send Message</Link>
                    </div>
                )
            }
        </div>
    )
}

export default ListUser