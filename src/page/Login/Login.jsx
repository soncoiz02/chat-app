import React, { useEffect } from 'react'
import './login.scss'

import { GoogleAuthProvider, FacebookAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import app from '../../firebase/firebaseConfig';
import { getAllUser, getUser, setIsOnline } from '../../firebase/user';

import { useDispatch, useSelector } from 'react-redux';
import { setInfor, setOnlineUsers } from '../../redux/action/user';
import { useNavigate } from 'react-router-dom';

const ggProvider = new GoogleAuthProvider()
const fbProvider = new FacebookAuthProvider()

const auth = getAuth(app)
const db = getFirestore(app)

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const authChange = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userId = user.providerData[0].uid
                const userData = await getUser(userId)
                if (userData) {
                    await setIsOnline(userId, true)
                    const snapshot = await getAllUser()
                    let users = []
                    snapshot.forEach(e => {
                        users.push(e.data())
                    })
                    users = users.filter(e => e.uid !== userId)
                    dispatch(setInfor(userData))
                    dispatch(setOnlineUsers(users))
                    navigate('/')
                }
            }
        })

        return authChange
    }, [])

    const handleExistUser = async (uid, data) => {
        const userData = await getUser(uid)
        if (userData) {
            console.log(userData);
        }
        else {
            const userDocRef = doc(db, 'users', `${uid}`)
            await setDoc(userDocRef, data)
            console.log('New user has added');
        }
    }

    const handleLoginWithGG = async () => {
        const { user } = await signInWithPopup(auth, ggProvider)
        const { uid, photoURL, displayName } = user.providerData[0]
        const userData = {
            uid: uid,
            fullname: displayName,
            avatar: photoURL,
            isOnline: false
        }
        handleExistUser(uid, userData)
    }

    const handleLoginWithFb = async () => {
        const { user } = await signInWithPopup(auth, fbProvider)
        const { uid, photoURL, displayName } = user.providerData[0]
        const userData = {
            uid: uid,
            fullname: displayName,
            avatar: photoURL,
            isOnline: false,
            listFriends: []
        }
        handleExistUser(uid, userData)
    }

    return (
        <div className='login'>
            <div className="box">
                <h2>Login with social media platform</h2>
                <div className="list">
                    <div className="item" onClick={handleLoginWithGG}>Login with Google</div>
                    <div className="item" onClick={handleLoginWithFb}>Login with Facebook</div>
                </div>
            </div>
        </div>
    )
}

export default Login