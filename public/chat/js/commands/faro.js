const commandFaro = (message) => {
  if (message.message === ".faro") {
    const messages = document.getElementsByClassName("messages")[0];
    const random = new Random();

    message.author = "Mr. Robot";

    let audios = [];

    // Create array of audios to void repeat code
    for(let i = 1; i <= 6; i++) {
      audios.push(`../media/faro${i}.mp3`);
    };

    const randomAudio = random.randomIndex(audios);
    message.message = randomAudio;

    setTimeout(() => {
      socket.emit("sendMessage", message);
      messages.innerHTML += `<div class="message"><strong>${message.author}</strong>: <audio src="${message.message}" controls></audio</div>`;
    }, 2000);
  };
};
