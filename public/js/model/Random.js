class Random {
    randomIndex(array) {
        const random = array[Math.floor(Math.random() * array.length)];

        return random;
    };   
};