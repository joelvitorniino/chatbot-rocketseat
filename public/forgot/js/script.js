const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementsByName("email")[0].value;

    fetch('http://localhost:3000/api/v1/forgot_password', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
  })
    .then(() => {
        const div = document.createElement('div');

        div.innerHTML = `<br><br><strong>Verify your email!</strong>`
        document.querySelector('.forgot-form').appendChild(div);

        setTimeout(() => {
            window.location.href = 'http://localhost:3000/reset_password'
        }, 5000);
    })
    .catch(() => alert("Error! Email invalid"));
});