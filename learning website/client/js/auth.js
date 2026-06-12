const apiUrl = 'http://localhost:5000/api';

const saveToken = (token) => localStorage.setItem('token', token);
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const showError = (message) => alert(message);

const handleLogin = async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      return showError(data.message || 'Login failed');
    }

    saveToken(data.token);
    localStorage.setItem('userId', data.user.id);
    window.location.href = 'dashboard.html';
  } catch (error) {
    showError(error.message);
  }
};

const handleRegister = async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      return showError(data.message || 'Registration failed');
    }

    saveToken(data.token);
    localStorage.setItem('userId', data.user.id);
    window.location.href = 'dashboard.html';
  } catch (error) {
    showError(error.message);
  }
};

if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

if (document.getElementById('register-form')) {
  document.getElementById('register-form').addEventListener('submit', handleRegister);
}
