import React from 'react'
import './listmess.scss'

const LissMessage = ({ data, currentUserId }) => {
    return (

        <div className="list-mess">
            {
                data?.map((mess, index) =>
                    <p className={`mess ${mess.sender === currentUserId ? 'sender' : 'reciever'}`} key={index}>{mess.content}</p>
                )
            }
        </div>
    )
}

export default LissMessage