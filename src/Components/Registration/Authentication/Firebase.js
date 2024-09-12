// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from 'firebase/auth';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyB_H68d4icMFsZk7RodsCNZH9czEXpbPF8",
//     authDomain: "demoauth-service.firebaseapp.com",
//     projectId: "demoauth-service",
//     storageBucket: "demoauth-service.appspot.com",
//     messagingSenderId: "1067061917224",
//     appId: "1:1067061917224:web:879ef6e0b0f1aceb32a71d",
//     measurementId: "G-1G7PWNLF2Q"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_H68d4icMFsZk7RodsCNZH9czEXpbPF8",
    authDomain: "demoauth-service.firebaseapp.com",
    projectId: "demoauth-service",
    storageBucket: "demoauth-service.appspot.com",
    messagingSenderId: "1067061917224",
    appId: "1:1067061917224:web:879ef6e0b0f1aceb32a71d",
    measurementId: "G-1G7PWNLF2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider };