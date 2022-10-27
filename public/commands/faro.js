const commandFaro = (message) => {
  if (message.message === ".faro") {
    const messages = document.getElementsByClassName("messages")[0];

    message.author = "Mr. Robot";

    const audios = [
      "../media/faro1.mp3",
      "../media/faro2.mp3",
      "../media/faro3.mp3",
      "../media/faro4.mp3",
      "../media/faro5.mp3",
      "../media/faro6.mp3",
    ];

    const randomAudio = audios[Math.floor(Math.random() * audios.length)];
    message.message = randomAudio;

    setTimeout(() => {
      socket.emit("sendMessage", message);
      messages.innerHTML += `<div class="message"><strong>${message.author}</strong>: <audio class="audio-faro" src="${message.message}" controls></div>`;
    }, 2000);
  };
};
