const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementsByName("name")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("password")[0].value;

  fetch('http://localhost:3000/api/v1/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });
  
  fetch('http://localhost:3000/api/v1/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  }).then(() => {
    window.location.href = 'http://localhost:3000'
  });
});