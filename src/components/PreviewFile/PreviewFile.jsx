import React from 'react'
import { BsFileEarmarkTextFill } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import './filePreview.scss'

const PreviewFile = ({ filePreview, updateFilePreview, files, updateFiles }) => {
    const handleRemove = (key) => {
        filePreview = filePreview.filter(e => e.name !== key)
        files = files.filter(e => e.name !== key)
        updateFilePreview(filePreview)
        updateFiles(files)
    }
    return (
        <div className='preview-file'>
            {
                filePreview.length > 0 &&
                filePreview.map((file, index) =>
                    <div className="preview" key={index}>
                        {
                            file.type === 'image' &&
                            <div className="img">
                                <img src={file.result} alt="" />
                            </div>
                        }
                        {
                            file.type === 'application' &&
                            <div className="file">
                                <BsFileEarmarkTextFill />
                                <p>
                                    {file.name}
                                </p>
                            </div>
                        }
                        <div className="btn-close" onClick={() => handleRemove(file.name)}>
                            <FaTimes />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default PreviewFile