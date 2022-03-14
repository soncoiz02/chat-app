import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import './roomInfor.scss'

const listTheme = ['green', 'red', 'pink', 'purple']

const RoomInfor = ({ recieveUser, roomData }) => {
    const [nickNameVal, setNickNameVal] = useState('')
    return (
        <div className='room-infor'>
            <div className="user">
                <div className="avt">
                    <img src={recieveUser.avatar} alt="" />
                </div>
                <div className="name">{recieveUser.nickName}</div>
            </div>
            <div className="setting">
                <div className="change">
                    <p><FaPen />Edit nicknames</p>
                    <div className="list-user">
                        {
                            roomData?.users?.map((e, index) =>
                                <div className="item" key={index}>
                                    <div className="avt">
                                        <img src={e.avatar} alt="" />
                                    </div>
                                    <input type="text" value={nickNameVal} placeholder={e.nickName} onChange={(e) => setNickNameVal(e.target.value)} />
                                </div>
                            )
                        }
                    </div>
                    <button className="btn-apply">Apply</button>
                </div>
                <div className="change">
                    <p><div className="circle"></div>Change theme</p>
                    <div className="list-theme">
                        {
                            listTheme.map((e, index) =>
                                <div className="theme" style={{ background: e }} key={index}></div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomInfor