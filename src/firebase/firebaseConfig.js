// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9RAGtWtpdapnsofxy-3NUV8oRv5ySpb4",
    authDomain: "chat-app-7e764.firebaseapp.com",
    projectId: "chat-app-7e764",
    storageBucket: "chat-app-7e764.appspot.com",
    messagingSenderId: "649991154567",
    appId: "1:649991154567:web:51a97d30089f99f2144122",
    measurementId: "G-0Z5TYWFLJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app