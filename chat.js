// // Import the functions you need from the SDKs you need
// import { initializeApp } from "./firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyALDLBUBMSTduJtnplwtOWYJ3lyE3qyrq4",
//     authDomain: "little-chat-js-firebase.firebaseapp.com",
//     projectId: "little-chat-js-firebase",
//     storageBucket: "little-chat-js-firebase.appspot.com",
//     messagingSenderId: "473987508201",
//     appId: "1:473987508201:web:fc2d7b7907bc0940cc4d78",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

scrollToBottom();

function scrollToBottom() {
    const chatArea = document.getElementById("chatArea");
    chatArea.scrollTop = chatArea.scrollHeight;
}
