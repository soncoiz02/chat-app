import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUser } from '../../firebase/user'
import { setReciever } from '../../redux/action/user'
import './listUser.scss'
const ListUser = () => {
    const [listUser, setListUser] = useState([])
    const userInfor = useSelector(state => state.user.infor)
    const dispatch = useDispatch()
    useEffect(() => {
        const getData = async () => {
            const data = await getAllUser()
            const arr = []
            data.forEach(doc => arr.push(doc.data()))
            setListUser(arr.filter(e => e.uid !== userInfor.uid & e.isOnline === true))
        }
        getData()
    }, [])

    return (
        <div className='list'>
            {
                listUser &&
                listUser.map((e, index) =>
                    <div className="user" key={index}>
                        <div className="avt">
                            <img src={e.avatar} alt="" />
                        </div>
                        <div className="detail">
                            <div className="name">
                                {e.fullname}
                            </div>
                            <div className="status"><div className="dot"></div>Online</div>
                        </div>
                        <Link
                            className='btn-send'
                            to={`/room/${Number(e.uid) + Number(userInfor.uid)}`}
                            onClick={() => dispatch(setReciever(listUser[index]))}
                        >Send Message</Link>
                    </div>
                )
            }
        </div>
    )
}

export default ListUser