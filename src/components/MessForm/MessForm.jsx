import EmojiPicker from 'emoji-picker-react'
import { set } from 'firebase/database'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { FaPaperPlane } from 'react-icons/fa'
import { HiEmojiHappy } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { addMess } from '../../firebase/room'
import { setListMess } from '../../redux/action/room'
import PreviewFile from '../PreviewFile/PreviewFile'
import './messForm.scss'


const MessForm = ({ roomId, currentUser }) => {
    const listMess = useSelector(state => state.room.listMess)
    const dispatch = useDispatch()

    useEffect(() => {
        setMessVal('')
        setFiles([])
        setFilePreview([])
    }, [roomId])

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [messVal, setMessVal] = useState('')
    const [files, setFiles] = useState([])
    const [filePreview, setFilePreview] = useState([])

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
            const newMess = {
                sender: currentUser.uid,
                content: messVal
            }
            if (listMess) {
                listMess.push(newMess)
                await addMess(roomId, listMess)
                dispatch(setListMess(listMess))
            }
            else {
                const firstMess = [newMess]
                await addMess(roomId, firstMess)
                dispatch(setListMess(firstMess))
            }
            setMessVal('')
        }
    }

    const handleFile = (e) => {
        const listFile = e.target.files
        let currentFiles = []
        for (let i = 0; i < listFile.length; i++) {
            files.push(listFile[i])
            currentFiles.push(listFile[i])
        }
        setFiles(files)
        if (currentFiles.length > 0) {
            currentFiles.forEach(file => {
                if (file.type.includes('image')) {
                    const fileReader = new FileReader()
                    fileReader.readAsDataURL(file)
                    fileReader.addEventListener('load', () => {
                        filePreview.push(
                            {
                                name: file.name,
                                result: fileReader.result,
                                type: "image"
                            }
                        )
                    })

                }
                else if (file.type.includes('application')) {
                    filePreview.push(
                        {
                            name: file.name,
                            type: "application"
                        }
                    )
                }
            })
            setTimeout(() => {
                setFilePreview([...filePreview])
            }, 3000)
        }

    }

    return (
        <div className='mess-form'>
            <div className="option">
                <div className="btn-add file">
                    <label htmlFor="file">
                        <BsFillImageFill />
                    </label>
                    <p className="detail">Add a file</p>
                    <input
                        type="file"
                        id='file'
                        onChange={(e) => handleFile(e)}
                        multiple
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
            <form action="" className="form" onSubmit={(e) => handleSendMess(e)}>
                {
                    filePreview.length > 0 &&
                    <PreviewFile
                        filePreview={filePreview}
                        files={files}
                        updateFilePreview={setFilePreview}
                        updateFiles={setFiles}
                    />
                }
                <div className="input">
                    <input
                        type="text"
                        value={messVal}
                        onChange={(e) => setMessVal(e.target.value)}
                        placeholder='Write something'
                    />
                    <button type='submit'>
                        <FaPaperPlane />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessForm