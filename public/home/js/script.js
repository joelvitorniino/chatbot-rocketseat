const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementsByName('email')[0].value;
  const password = document.getElementsByName('password')[0].value;

  fetch('http://localhost:3000/api/v1/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {
      if(data.data === 'User exists!') {
        window.location.href = 'http://localhost:3000/chat?auth=true'
      } else {
        alert('Error! User not exists!');
      }
    });
});