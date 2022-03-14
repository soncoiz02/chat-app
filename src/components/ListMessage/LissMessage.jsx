import React, { useEffect, useState } from 'react'
import { BsFillTrashFill, BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteMess, getListMess } from '../../firebase/room'
import './listmess.scss'

const LissMessage = () => {
    const currentUserId = useSelector(state => state.user.infor).uid
    const roomId = useParams().id
    const [listMess, setListMess] = useState(null)
    useEffect(() => {
        getData()
    }, [listMess])

    const getData = async () => {
        const data = await getListMess(roomId)
        setListMess(data)
    }

    return (

        <div className="list-mess">
            {
                listMess?.map((mess, index) =>
                    mess.sender === currentUserId ?
                        <div className='mess sender' key={index}>
                            <div className="btn-setting">
                                <div className="options">
                                    <div className="btn-delete" onClick={() => deleteMess(roomId, index, mess.sender)}>
                                        <BsFillTrashFill />
                                        Delete
                                    </div>
                                </div>
                                <BsThreeDotsVertical />
                            </div>
                            <p className="content">
                                {mess.content}
                            </p>
                        </div> :
                        <div className='mess reciever' key={index}>
                            <p className="content">
                                {mess.content}
                            </p>
                            <div className="btn-setting">
                                <BsThreeDotsVertical />
                                <div className="options">
                                    <div className="btn-delete" onClick={() => deleteMess(roomId, index, mess.sender)}>
                                        <BsFillTrashFill />
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                )
            }
        </div >
    )
}

export default LissMessage