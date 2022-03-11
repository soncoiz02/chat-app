// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCacxNyQ3Pdhvy1_KLPmCmIr5DlJZ6KcCI",
    authDomain: "realtime-chat-app-ac2bf.firebaseapp.com",
    projectId: "realtime-chat-app-ac2bf",
    databaseURL: "https://realtime-chat-app-ac2bf-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "realtime-chat-app-ac2bf.appspot.com",
    messagingSenderId: "854833170600",
    appId: "1:854833170600:web:f8f53e446134856266da9d",
    measurementId: "G-QBE697WNS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app