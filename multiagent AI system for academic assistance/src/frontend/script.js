/*
===========================================
AI Learning Assistant Chatbot
Frontend Chat Logic

Author: Samruddhi Jane
Project: AI Learning Assistant
===========================================
*/

// ===========================================
// SELECT HTML ELEMENTS
// ===========================================

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// ===========================================
// EVENT LISTENERS
// ===========================================

// Send message when Send button is clicked
sendBtn.addEventListener("click", sendMessage);

// Send message when Enter key is pressed
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// ===========================================
// MAIN FUNCTION
// ===========================================

function sendMessage() {

    // Get user input and remove extra spaces
    const message = userInput.value.trim();

    // Prevent empty messages
    if (message === "") {
        return;
    }

    // Remove the default welcome message after first user message
    removeWelcomeMessage();

    // Display user message
    addUserMessage(message);

    // Clear input field
    userInput.value = "";

    // Simulate AI response
    setTimeout(() => {

        addBotMessage(
            "✅ Thanks! Your question has been received.\n\nAI processing will be connected in the next development phase."
        );

    }, 1000);
}

// ===========================================
// DISPLAY USER MESSAGE
// ===========================================

function addUserMessage(text) {

    const userMessage = document.createElement("div");

    userMessage.classList.add("user-message");

    userMessage.textContent = text;

    chatBox.appendChild(userMessage);

    scrollChatToBottom();
}

// ===========================================
// DISPLAY BOT MESSAGE
// ===========================================

function addBotMessage(text) {

    const botMessage = document.createElement("div");

    botMessage.classList.add("bot-message");

    botMessage.textContent = text;

    chatBox.appendChild(botMessage);

    scrollChatToBottom();
}

// ===========================================
// REMOVE WELCOME MESSAGE
// ===========================================

function removeWelcomeMessage() {

    const welcomeMessage = chatBox.querySelector(".bot-message");

    if (welcomeMessage && chatBox.children.length === 1) {
        welcomeMessage.remove();
    }
}

// ===========================================
// AUTO SCROLL CHAT
// ===========================================

function scrollChatToBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;
}
