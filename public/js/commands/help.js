const commandHelp = (message) => {
    if(message.message === '.help') {
        const messages = document.getElementsByClassName('messages')[0];

        message.author = 'Mr. Robot';
        message.message = '.wikipedia - Search in the wikipedia.\n .fox - Send image random of fox!'

        setTimeout(() => {
            socket.emit("sendMessage", message);
            messages.innerHTML += `<div class="message"><strong>${message.author}</strong>: ${message.message}</div>`
        }, 2000);
    };
};