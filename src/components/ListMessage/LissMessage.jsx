import React from 'react'
import './listmess.scss'
import { BsThreeDotsVertical, BsFillTrashFill } from 'react-icons/bs'
import { deleteMess } from '../../firebase/room'

const LissMessage = ({ data, currentUserId, roomId }) => {
    return (

        <div className="list-mess">
            {
                data?.map((mess, index) =>
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