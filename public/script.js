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

const renderMessage = (message) => {
  const messages = document.getElementsByClassName("messages")[0];

  if(message.author === 'Mr. Robot' && message.message.startsWith('https://randomfox.ca')) {
    messages.innerHTML += `<div class="message"><strong>${message.author}</strong>:</div>`;
    renderImage(message);
  } else {
    messages.innerHTML += `<div class="message"><strong>${message.author}</strong>: ${message.message}</div>`;
  };
};

const renderImage = (message) => {
  let image = document.createElement('img');
  image.src = message.message;

  document.querySelector('.messages').appendChild(image) 
};

socket.on("previousMessages", (messages) => {
  messages.forEach((message) => {
    renderMessage(message);
  });
});

socket.on("receivedMessage", (message) => {
  renderMessage(message);
});

const commands = (message) => {
  commandWikipedia(message);
  commandFox(message);
  commandHelp(message);
};

chat.addEventListener("submit", (event) => {
  event.preventDefault();

  const author = document.getElementsByName("username")[0].value;
  const message = document.getElementsByName("message")[0].value;

  setMessageObject(author, message);
  renderMessage(messageObject);
  renderImage(messageObject);

  commands(messageObject);
});
