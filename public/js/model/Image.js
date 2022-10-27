class InsertImage {
    insert(src) {
        const image = document.createElement('img');
        image.src = src;

        document.querySelector('.messages').appendChild(image);
    };
};