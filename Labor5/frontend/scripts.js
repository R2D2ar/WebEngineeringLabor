function checkPassword(password) {

    console.log(password);

    // Validate password
    if (password.length < 8) {
        alert('Das Passwort muss mindestens 8 Zeichen lang sein.');
        return false;
    }

    let hasNumber = false;
    let hasSpecialChar = false;
    const specialChars = "!#,+-_?";

    // Check if password contains at least one number and one special character
    for (let i = 0; i < password.length; i++) {
        const char = password[i];

        if (/\d/.test(char)) { // Check if character is a number
            hasNumber = true;
        }

        if (specialChars.includes(char)) { // Check if character is a special character
            hasSpecialChar = true;
        }
    }

    // Final validation check
    if (!hasNumber || !hasSpecialChar) {
        alert('Das Passwort muss mindestens eine Zahl sowie ein Sonderzeichen aus "!#,+-_?" enthalten.');
        return false;
    }
    return true;
}

function registerUser() {

    const form = document.querySelector('#registrationForm form');
    // Validate if the entries were made
    const userData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        username: form.username.value,
        gender: form.gender.value,
        category: form.category.value
    };
    console.log(userData)

    // Validate the fields
    for (const field in userData) {
        if (!userData[field]) {
            alert(`Bitte füllen Sie das Feld "${field}" aus.`);
            return;
        }
    }

    // Was the checkbox checked?
    const isChecked = form.terms.checked;
    console.log(isChecked);

    if (!isChecked) {
        alert('Bitte stimmen sie den Nutzungsbedingungen zu.');
        return
    }

    const inputRegex = /^[A-Za-z-_]+$/;
    const fieldNames = ["firstName", "lastName", "username"];

    for (let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        const input = userData[fieldName]; // Get the value for the field

        if (!inputRegex.test(input)) {
            alert(`Ungültige Eingabe im Feld: ${fieldName}. Bitte verwenden Sie nur Buchstaben, Bindestriche (-) oder Unterstriche (_).`);
            return;
        }
    }


    //Check the password
    const password = form.password.value;
    if(!checkPassword(password)) return;

    userData.password = password;
    userData.comments = form.comments.value;

    // Submit registration data
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
