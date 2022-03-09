import React from 'react'
import ListUser from '../../components/ListUser/ListUser'
import './home.scss'

const Home = () => {
    return (
        <div className='home'>
            <div className="container">
                <div className="main-content">
                    <h1>Wellcome to my Chat App</h1>
                    <p className="dsc">Find some new friend and start chat</p>
                    <a href='#list' className="btn-find">Find now</a>
                </div>
                <div className="list-user" id='list'>
                    <h2>Active Users</h2>
                    <ListUser />
                </div>
            </div>
        </div>
    )
}

export default Home