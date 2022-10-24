const commandHelp = (message) => {
    if(message.message === '.help') {
        const messages = document.getElementsByClassName('messages')[0];

        message.author = 'Mr. Robot';
        message.message = '.wikipedia - Search in the wikipedia.'

        setTimeout(() => {
            messages.innerHTML += `<div class="message"><strong>${message.author}</strong>: ${message.message}</div>`
        }, 2000);
    };
};