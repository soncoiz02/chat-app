import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ListFriends = ({ listFriends }) => {
    const [listMess, setListMess] = useState([])
    const userInfor = useSelector(state => state.user.infor)
    return (
        <div className='list-friends'>
            {
                listFriends.map(e =>
                    <Link to={`/room/${Number(e.uid) + Number(userInfor.uid)}`} className="item">
                        <div className="user">
                            <div className="avt">
                                <img src={e.avatar} alt="" />
                                <div className={`dot ${e.isOnline ? 'on' : 'off'}`}></div>
                            </div>
                            <div className="detail">
                                <div className="display-name">{e.displayName}</div>
                                <div className="recent-mess">
                                    {/* {
                                        listMess[listMess.length - 1].sender === e.uid ?
                                        `You: ${}`
                                    } */}
                                </div>
                            </div>
                        </div>
                        <div className="status">
                        </div>
                    </Link>
                )
            }
        </div>
    )
}

export default ListFriends