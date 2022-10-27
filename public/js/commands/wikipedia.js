const commandWikipedia = (message) => {
  if (
    message.message === `.wikipedia ${String(message.message).slice(10).trim()}`
  ) {
    const messages = document.getElementsByClassName("messages")[0];

    message.author = "Mr. Robot";

    fetch(
      `https://pt.wikipedia.org/api/rest_v1/page/summary/${String(
        message.message
      )
        .slice(10)
        .trim()}`
    )
      .then((response) => response.json())
      .then((data) => (message.message = data.extract))
      .catch((err) => (message.message = `Error: ${err}`));

    setTimeout(() => {
      socket.emit("sendMessage", message);
      messages.innerHTML += `<div class="message"><strong>${message.author}</strong>: ${message.message}</div>`;
    }, 2000);
  }
};
