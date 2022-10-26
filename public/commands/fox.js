const commandFox = (message) => {
    if (message.message === `.fox`) {
        const messages = document.getElementsByClassName("messages")[0];
    
        message.author = "Mr. Robot";

        let image = document.createElement('img');
    
        fetch('https://randomfox.ca/floof/')
          .then((response) => response.json())
          .then((data) => {
            message.message = data.image;
            image.src = data.image;
          })
          .catch((err) => (message.message = `Error: ${err}`));
          
          setTimeout(() => {
            socket.emit("sendMessage", message);
            messages.innerHTML += `<div class="message"><strong>${message.author}</strong>:</div>`;
            
            document.querySelector('.messages').appendChild(image);
        }, 2000);
    };
};