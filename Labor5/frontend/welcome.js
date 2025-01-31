async function loadUserData() {
    const response = await fetch('/user-info');
    if (!response.ok) {
        alert('Fehler beim Laden der Benutzerdaten.');
        window.location.href = 'index.html'; // Zurück zur Login-Seite
        return;
    }

    const userData = await response.json();
    const { firstName, lastName, category } = userData;

    // Set user greeting
    document.getElementById('userGreeting').textContent = `Hallo, ${firstName} ${lastName}!`;

    // Show only the relevant category section
    document.querySelectorAll('.content').forEach(section => {
        if (section.dataset.category === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

function displayTime() {
    const now = new Date();
    document.getElementById('time').textContent = `Aktuelle Zeit: ${now.toLocaleTimeString()}`;
}

function loadGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                document.getElementById('geolocation').textContent =
                    `Geokoordinaten: Breite ${position.coords.latitude}, Länge ${position.coords.longitude}`;
            },
            error => {
                document.getElementById('geolocation').textContent = 'Geokoordinaten konnten nicht geladen werden.';
            }
        );
    } else {
        document.getElementById('geolocation').textContent = 'Geolocation wird nicht unterstützt.';
    }
}

// Initialize page
loadUserData();
displayTime();
loadGeolocation();

// Update time every second
setInterval(displayTime, 1000);