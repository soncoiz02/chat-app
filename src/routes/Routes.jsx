import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from '../firebase/requiredAuth'
import Account from '../page/Account/Account'
import Home from '../page/Home/Home'
import Login from '../page/Login/Login'
import Room from '../page/Room/Room'

const Router = () => {
    return (
        <Routes>
            <Route element={<RequireAuth />}>
                <Route path='/' element={<Home />} />
                <Route path='/account/:id' element={<Account />} />
                <Route path='/room/:id' element={<Room />} />
            </Route>
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default Router