import React, { useEffect, useState } from 'react'
import { BsFillTrashFill, BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteMess, getListMess } from '../../firebase/room'
import { BsFileEarmarkTextFill } from 'react-icons/bs'
import './listmess.scss'

const LissMessage = () => {
    const currentUserId = useSelector(state => state.user.infor).uid
    const roomId = useParams().id
    const [listMess, setListMess] = useState(null)

    const [popup, setPopup] = useState(false)
    const [showImg, setShowImg] = useState('')

    useEffect(() => {
        getData()
    }, [listMess])

    const getData = async () => {
        const data = await getListMess(roomId)
        setListMess(data)
    }

    const handleShowImg = (link) => {
        setShowImg(link)
        setPopup(true)
    }

    return (

        <div className="list-mess">
            {
                popup &&
                <div className="popup">
                    <div className="img">
                        <img src={showImg} alt="" />
                    </div>
                    <div className="btn-close" onClick={() => setPopup(false)}>x</div>
                </div>
            }
            {
                listMess?.reverse().map((mess, index) =>
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
                            {
                                mess.content &&
                                <p className="content">
                                    {mess.content}
                                </p>
                            }
                            {
                                mess.img &&
                                <div className="img" onClick={() => handleShowImg(mess.img)}>
                                    <img src={mess.img} alt="" />
                                </div>
                            }
                            {
                                mess.file &&
                                <a href={mess.file} download className="file" onClick={() => window.open(mess.file)}>
                                    <BsFileEarmarkTextFill />
                                    <p>
                                        {mess.name}
                                    </p>
                                </a>
                            }
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