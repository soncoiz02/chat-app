import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setReciever } from '../../redux/action/user'
import './listFriends.scss'

const ListFriends = ({ listFriends }) => {
    const userInfor = useSelector(state => state.user.infor)
    const dispatch = useDispatch()
    return (
        <div className='list-friends'>
            {
                listFriends.length > 0 ?
                    listFriends.map((e, index) =>
                        <Link
                            key={index}
                            className="item"
                            to={`/room/${e.users.reduce((a, b) => Number(a.uid) + Number(b.uid))}`}
                            onClick={() => dispatch(setReciever(e.users.find(e => e.uid !== userInfor.uid)))}
                        >
                            <div className="user">
                                <div className="avt">
                                    <img src={e.users.find(e => e.uid !== userInfor.uid).avatar} alt="" />
                                    <div className={`dot ${e.isOnline ? 'on' : 'off'}`}></div>
                                </div>
                                <div className="detail">
                                    <div className="display-name">{e.users.find(e => e.uid !== userInfor.uid).nickName}</div>
                                    <div className="recent-mess">
                                        {
                                            e.messages[e.messages.length - 1].sender === userInfor.uid
                                                ? `You: ${e.messages[e.messages.length - 1].content}`
                                                : e.messages[e.messages.length - 1].content
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                e.users.find(e => e.uid !== userInfor.uid).isOnline ? <div className="status on"></div> : <div className="status off"></div>
                            }
                        </Link>
                    )
                    :
                    <div className="empty">
                        You haven't have any friend. Find some friend to start chat.
                    </div>
            }
        </div>
    )
}

export default ListFriends