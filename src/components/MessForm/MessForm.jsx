import EmojiPicker from 'emoji-picker-react'
import React, { useRef, useState } from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { FaPaperPlane } from 'react-icons/fa'
import { HiEmojiHappy } from 'react-icons/hi'
import { addMess, addRoomData } from '../../firebase/room'
import './messForm.scss'


const MessForm = ({ roomId, roomData, listMess, currentUser, recieveUser }) => {
    const [messVal, setMessVal] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [files, setFiles] = useState([])


    const fileRef = useRef()

    const onEmojiClick = (e, obj) => {
        setMessVal(messVal + obj.emoji)
    }

    const handleSendMess = async (e) => {
        e.preventDefault()
        if (files.length > 0) {
            files.forEach(e => {
                console.log(e);
            })
        }
        if (messVal !== '') {
            if (roomData) {
                const newMess = {
                    sender: currentUser.uid,
                    content: messVal
                }
                listMess.push(newMess)
                await addMess(roomId, listMess)
            }
            else {
                const data = {
                    id: roomId,
                    messages: [
                        {
                            sender: currentUser.uid,
                            content: messVal
                        }
                    ],
                    users: [
                        {
                            uid: currentUser.uid,
                            nickName: currentUser.fullname,
                            avatar: currentUser.avatar,
                            isOnline: currentUser.isOnline
                        },
                        {
                            uid: recieveUser.uid,
                            nickName: recieveUser.fullname,
                            avatar: recieveUser.avatar,
                            isOnline: recieveUser.isOnline
                        }
                    ],
                    colorTheme: "blue"
                }
                addRoomData(roomId, data)
            }
            setMessVal('')
        }
    }

    // const handleFile = (e) => {
    //     const file = e.target.files[0]
    //     if (file) {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.addEventListener('load', () => {
    //             if (file.type.includes('image')) {
    //                 fileRef.current.insertAdjacentHTML('beforeend', `<div class="img"><img src="${fileReader.result}" /></div>`)
    //             }
    //             else if (file.type.includes('audio')) {
    //                 fileRef.current.insertAdjacentHTML('beforeend', `<div class="audio">${file.name}</div>`)
    //             }
    //         })
    //         files.push(file)
    //         setFiles(files)
    //         // setImgNameFile(file.name)
    //         // setImgFile(file)
    //     }
    // }

    return (
        <div className='mess-form'>
            <form action="" className="form" onSubmit={(e) => handleSendMess(e)}>
                <div className="preview-file" ref={fileRef}></div>
                <input
                    type="text"
                    value={messVal}
                    onChange={(e) => setMessVal(e.target.value)}
                    placeholder='Write something'
                />
                <button type='submit'>
                    <FaPaperPlane />
                </button>
            </form>
            <div className="option">
                <div className="btn-add file">
                    <label htmlFor="file">
                        <BsFillImageFill />
                    </label>
                    <p className="detail">Add a file</p>
                    <input
                        type="file"
                        id='file'
                    // onChange={(e) => handleFile(e)}
                    />
                </div>
                <div className="btn-add icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <HiEmojiHappy />
                    <p className="detail">Add an icon</p>
                </div>
                {
                    showEmojiPicker &&
                    <div className="list-icon">
                        <EmojiPicker disableSearchBar onEmojiClick={onEmojiClick} />
                    </div>
                }
            </div>
        </div>
    )
}

export default MessForm