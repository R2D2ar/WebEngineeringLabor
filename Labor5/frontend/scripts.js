// Registrierung
function registerUser() {
    const form = document.getElementById('registrationForm');
    if (!form.checkValidity()) {
        alert('Bitte füllen Sie alle Felder korrekt aus.');
        return;
    }

    const userData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        username: form.username.value,
        password: form.password.value,
        gender: form.gender.value,
        category: form.category.value,
        comments: form.comments.value
    };

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                alert(`Registrierung erfolgreich! Willkommen, ${userData.firstName} ${userData.lastName}.`);
                window.location.href = 'index.html';
            } else {
                alert('Fehler bei der Registrierung. Bitte versuchen Sie es erneut.');
            }
        })
        .catch(err => console.error('Fehler bei der Registrierung:', err));
}


// Login
function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Bitte Benutzernamen und Passwort eingeben.');
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ungültige Anmeldedaten');
            }
        })
        .then(data => {
            alert(data.message);
            // Weiterleitung basierend auf Kategorie
            window.location.href = `welcome.html?category=${encodeURIComponent(data.category)}`;
        })
        .catch(err => alert(err.message));
}


// Antwortseite
if (window.location.pathname.endsWith('welcome.html')) {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('userCategory').textContent = user.category;
    document.getElementById(user.category).style.zIndex = 10;

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        document.getElementById('userLocation').textContent = `${latitude}, ${longitude}`;
    });

    setInterval(() => {
        const now = new Date();
        document.getElementById('currentTime').textContent = now.toLocaleTimeString();
    }, 1000);
}
