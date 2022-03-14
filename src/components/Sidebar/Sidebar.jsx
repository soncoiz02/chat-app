import { async } from '@firebase/util'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { BiDotsHorizontalRounded, BiLogOut, BiSearchAlt } from 'react-icons/bi'
import { FaHome, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import app from '../../firebase/firebaseConfig'
import { getAllRoomData, setOfflineUser } from '../../firebase/room'
import { setIsOnline } from '../../firebase/user'
import ListFriends from '../ListFriends/ListFriends'
import './sidebar.scss'

const auth = getAuth(app)

const Sidebar = () => {
    const userInfor = useSelector(state => state.user.infor)
    const navigate = useNavigate()

    const [searchVal, setSearchVal] = useState('')
    const [listFriends, setListFriends] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await getAllRoomData()
            if (data) {
                const dataFilter = Object.values(data).filter(e => e.users.find(e => e.uid === userInfor.uid))
                setListFriends(dataFilter)
            }
        }
        getData()
    }, [listFriends])

    const handleLogout = async () => {
        await setIsOnline(userInfor.uid, false)
        listFriends.forEach(e => e.users.find(e => e.uid === userInfor.uid).isOnline = false)
        listFriends.forEach(async (e) => {
            await setOfflineUser(e.id, e)
        })
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
                            <Link to={'/'} className='link'>
                                <FaHome />
                                Home
                            </Link>
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
                <ListFriends listFriends={listFriends} />
            </div>
        </div>
    )
}

export default Sidebar