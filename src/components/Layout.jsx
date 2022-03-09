import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from '../routes/Routes'
import Sidebar from './Sidebar/Sidebar'
import '../assets/style/index.scss'

const Layout = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Sidebar />
                <div className="main">
                    <Router />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default Layout