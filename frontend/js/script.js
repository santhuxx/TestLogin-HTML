document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    });
  
    const data = await response.json();
  
    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      const errorMessageDiv = document.getElementById('error-message');
      errorMessageDiv.textContent = data.message;
    }
  });
  