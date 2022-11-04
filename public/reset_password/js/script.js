const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementsByName("email")[0].value;
    const token = document.getElementsByName("token")[0].value;
    const password = document.getElementsByName("password")[0].value;

    fetch('http://localhost:3000/api/v1/reset_password', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, token, password })
    })
    .then(() => window.location.href = "http://localhost:3000")
    .catch(() => alert("Token invalid!"));
});