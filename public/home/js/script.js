const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementsByName('email')[0].value;
  const password = document.getElementsByName('password')[0].value;

  await fetch('http://localhost:3000/api/v1/auth', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("token_secret", data.token);
      window.location.href = 'http://localhost:3000/chat';
    })
    .catch(() => {
      alert("Email or Password invalid!");
      window.location.href = 'http://localhost:3000'
    });

    fetch('http://localhost:3000/api/v1/email/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
});