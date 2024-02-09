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
        sender.textContent = `${data.val().name} - ${data.val().time}`;
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
        sender.textContent = `${data.val().name} - ${data.val().time}`;
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
    const formatedTime = getTime();

    set(ref(db, "messages/" + id), {
        name: userName,
        message: message.value,
        time: formatedTime,
    });

    message.value = "";

    console.log("message sent");
}

function getTime() {
    const time = new Date();
    const hour = formatTimeValue(time.getHours(), "hour");
    const minutes = formatTimeValue(time.getMinutes(), "minutes");
    const date = formatTimeValue(time.getDate(), "date");
    const month = formatTimeValue(time.getMonth() + 1, "month");
    const year = time.getFullYear();

    const formatedTime = `${hour}h${minutes} - ${date}/${month}/${year}`;

    return formatedTime;
}

function formatTimeValue(value, debug) {
    let result;
    switch (true) {
        case value >= 0 && value <= 9:
            result = `0${value}`;
            break;
        case value >= 10:
            result = value;
            break;
        default:
            result = "??";
            console.log(`Failed to set ${debug}`);
    }
    return result;
}

function scrollToBottom() {
    const chatArea = document.getElementById("chatArea");
    chatArea.scrollTop = chatArea.scrollHeight;
}
