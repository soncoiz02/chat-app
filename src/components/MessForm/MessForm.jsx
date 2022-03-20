import EmojiPicker from 'emoji-picker-react'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { FaPaperPlane } from 'react-icons/fa'
import { HiEmojiHappy } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { addMess } from '../../firebase/room'
import { setListMess } from '../../redux/action/room'
import PreviewFile from '../PreviewFile/PreviewFile'
import './messForm.scss'

import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage'
import app from '../../firebase/firebaseConfig'

const storage = getStorage(app)

const MessForm = ({ roomId, currentUser }) => {
    const listMess = useSelector(state => state.room.listMess)
    const dispatch = useDispatch()

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [messVal, setMessVal] = useState('')
    const [files, setFiles] = useState([])
    const [filePreview, setFilePreview] = useState([])

    const [popup, setPopup] = useState(false)

    useEffect(() => {
        setMessVal('')
        setFiles([])
        setFilePreview([])
    }, [roomId])

    const onEmojiClick = (e, obj) => {
        setMessVal(messVal + obj.emoji)
    }

    const handleSendMess = async (e) => {
        e.preventDefault()
        if (files.length > 0) {
            let links = []
            files.forEach(async (file) => {
                const fileRef = storageRef(storage, `${roomId}/${file.name}`)
                const fileSnapshot = await uploadBytes(fileRef, file)
                if (fileSnapshot) {
                    const url = await getDownloadURL(fileRef)
                    links.push({
                        url: url,
                        type: file.type,
                        name: file.name
                    })
                }
            })

            setTimeout(() => {
                links.forEach(async (link) => {
                    if (link.type.includes('image')) {
                        const newMess = {
                            sender: currentUser.uid,
                            img: link.url
                        }
                        await sendMess(newMess)
                    }
                    else if (link.type.includes('application')) {
                        const newMess = {
                            sender: currentUser.uid,
                            file: link.url,
                            name: link.name
                        }
                        console.log(newMess);
                        await sendMess(newMess)
                    }
                })
            }, 3000)
        }
        if (messVal !== '') {
            const newMess = {
                sender: currentUser.uid,
                content: messVal
            }
            await sendMess(newMess)
        }
    }

    const sendMess = async (newMess) => {
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
        setFiles([])
        setFilePreview([])
    }

    const handleFile = (e) => {
        const listFile = e.target.files
        let currentFiles = []
        for (let i = 0; i < listFile.length; i++) {
            if (listFile[i].size <= 2097152) {
                files.push(listFile[i])
                currentFiles.push(listFile[i])
            }
            else {
                setPopup(true)
            }
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

    const handleUploadFiles = async () => {

    }

    return (
        <div className='mess-form'>
            {
                popup &&
                <div className="popup">
                    <div className="cover">
                        <p>
                            {"Your file upload is to large, please upload file has size <= 2MB"}
                        </p>
                        <div className="btn-close" onClick={() => setPopup(false)}>x</div>
                    </div>
                </div>
            }
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