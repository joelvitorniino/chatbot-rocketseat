const commandFox = (message) => {
    if (message.message === `.fox`) {
        const messages = document.getElementsByClassName("messages")[0];
        const image = new InsertImage();
    
        message.author = "Mr. Robot";
    
        fetch('https://randomfox.ca/floof/')
          .then((response) => response.json())
          .then((data) => {
            message.message = data.image;
          })
          .catch((err) => (message.message = `Error: ${err}`));
          
          setTimeout(() => {
            socket.emit("sendMessage", message);
            messages.innerHTML += `<div class="message"><strong>${message.author}</strong>:</div>`;
            
            image.insert(message.message);
        }, 2000);
    };
};