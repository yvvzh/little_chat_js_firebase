import { ref, set, push, child, onChildAdded } from "firebase/database";
import { db } from "./firebase";

const userName = prompt("Enter your name");

const pseudoDisplay = document.getElementById("pseudo-display");

const chatArea = document.getElementById("chatArea");

const message = document.getElementById("message");

const submit = document.getElementById("submit");

const newMsg = ref(db, "messages/");

pseudoDisplay.textContent = userName;

onChildAdded(newMsg, (data) => {
    displayMessages(data);
    scrollToBottom();
});

submit.addEventListener("click", () => {
    if (message.value.trim() !== "") {
        sendMessage();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && message.value.trim() !== "") {
        sendMessage();
    }
});

function displayMessages(data) {
    if (data.val().name === userName) {
        let sender = document.createElement("span");
        sender.textContent = data.val().name;
        sender.classList.add("sender");
        let content = document.createElement("p");
        content.textContent = data.val().message;
        let div = document.createElement("div");
        div.classList.add("user-msg");
        div.appendChild(content);
        div.appendChild(sender);
        chatArea.appendChild(div);
    } else {
        let sender = document.createElement("span");
        sender.textContent = data.val().name;
        sender.classList.add("sender");
        let content = document.createElement("p");
        content.textContent = data.val().message;
        let div = document.createElement("div");
        div.classList.add("buddy-msg");
        div.appendChild(content);
        div.appendChild(sender);
        chatArea.appendChild(div);
    }
}

function sendMessage() {
    const id = push(child(ref(db), "messages")).key;

    set(ref(db, "messages/" + id), {
        name: userName,
        message: message.value,
    });

    message.value = "";

    console.log("message sent");
}

function scrollToBottom() {
    const chatArea = document.getElementById("chatArea");
    chatArea.scrollTop = chatArea.scrollHeight;
}
