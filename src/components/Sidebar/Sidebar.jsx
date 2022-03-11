import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BiDotsHorizontalRounded, BiSearchAlt, BiLogOut } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import './sidebar.scss'
import { getAuth } from 'firebase/auth'
import app from '../../firebase/firebaseConfig'
import { useSelector } from 'react-redux'
import { setIsOnline } from '../../firebase/user'

const auth = getAuth(app)

const Sidebar = () => {
    const userInfor = useSelector(state => state.user.infor)
    const navigate = useNavigate()

    const [searchVal, setSearchVal] = useState('')

    window.addEventListener('unload', async () => {
        await setIsOnline(userInfor.uid, false)
        await auth.signOut()
    })

    const handleLogout = async () => {
        await setIsOnline(userInfor.uid, false)
        await auth.signOut()
        navigate('/login')
    }

    return (
        <div className='sidebar'>
            <div className="sidebar-top">
                <div className="user">
                    <div className="infor">
                        <div className="avt">
                            <img src={userInfor.avatar} alt="" />
                        </div>
                        <div className="detail">
                            <div className="fullname">{userInfor.fullname}</div>
                            <div className="status"><div className="dot"></div>Online</div>
                        </div>
                    </div>
                    <div className="popup">
                        <div className="setting-btn">
                            <BiDotsHorizontalRounded />
                        </div>
                        <div className="list-link" >
                            <Link to={'/account/asdas'} className='link'>
                                <FaUser />
                                Account
                            </Link>
                            <div className='link' onClick={handleLogout}>
                                <BiLogOut />
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
                <form className="search-form">
                    <input
                        type="text"
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                        placeholder='Search friend'
                    />
                    <button type='submit'><BiSearchAlt /></button>
                </form>
            </div>
            <div className="sidebar-main">
                {
                    userInfor?.listFriends?.lenght > 0 ?
                        <div className="list-friends">
                            <Link to={`/room/1232`} className="item">
                                <div className="user">
                                    <div className="avt">
                                        <img src="" alt="" />
                                        <div className="dot"></div>
                                    </div>
                                    <div className="detail">
                                        <div className="display-name">ABSKS</div>
                                        <div className="recent-mess">You: daskjgdjhsaguwqdhqwk</div>
                                    </div>
                                </div>
                                <div className="status">
                                </div>
                            </Link>
                        </div>
                        :
                        <div className="empty">
                            You haven't have any friend. Find some friend to start chat.
                        </div>
                }
            </div>
        </div>
    )
}

export default Sidebar