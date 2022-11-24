const socket = io("http://localhost:3000");

const chat = document.getElementById("chat");
let messageObject;

const setMessageObject = (author, message) => {
  if (author.length && message.length) {
    messageObject = {
      author: author,
      message: message,
    };

    socket.emit("sendMessage", messageObject);

    return messageObject;
  }
};

const renderImage = new InsertImage();

try {
const renderMessage = (message) => {
  const messages = document.getElementsByClassName("messages")[0];

  if(message.author === 'Mr. Robot' && message.message.startsWith('https://randomfox.ca')) {
    messages.innerHTML += `<div class="message"><strong>${message.author}</strong>:</div>`;
    renderImage.insert(message.message);
  } else if(message.author === 'Mr. Robot' && message.message.startsWith('../media')) {
    messages.innerHTML += `<div class="message"><strong>${message.author}</strong>: <audio class="audio-faro" src="${message.message}" controls></div>`;
  } else {
    messages.innerHTML += `<div class="message"><strong>${message.author}</strong>: ${message.message}</div>`;
  };
};

socket.on("previousMessages", (messages) => {
  messages.forEach((message) => renderMessage(message));
});

socket.on("receivedMessage", (message) => {
  renderMessage(message);
});

const commands = (message) => {
  commandWikipedia(message);
  commandFox(message);
  commandFaro(message);
  commandHelp(message);
};

chat.addEventListener("submit", (event) => {
  event.preventDefault();

  const author = localStorage.getItem('name_chat');
  const message = document.getElementsByName("message")[0].value;

  setMessageObject(author, message);
  renderMessage(messageObject);

  commands(messageObject);
});
} catch(e) {
  console.log(e);
}