const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Endpoint zum Registrieren neuer Benutzer
app.post('/register', (req, res) => {
    const newUser = req.body;

    // Lies die aktuelle JSON-Datei
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return res.status(500).send('Serverfehler');
        }

        const users = JSON.parse(data);
        users.push(newUser); // Füge den neuen Benutzer hinzu

        // Schreibe die aktualisierte Datei
        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Fehler beim Schreiben der Datei:', err);
                return res.status(500).send('Serverfehler');
            }

            res.status(201).send('Benutzer erfolgreich registriert');
        });
    });
});

let loggedInUser = null;

// Endpoint für den Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return res.status(500).send('Serverfehler');
        }

        const users = JSON.parse(data);
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            loggedInUser = user;
            res.status(200).json({
                message: `Willkommen zurück, ${user.firstName} ${user.lastName}!`,
                category: user.category
            });
        } else {
            res.status(401).send('Ungültige Anmeldedaten');
        }
    });
});

// User Info endpoint
app.get('/user-info', (req, res) => {
    if (!loggedInUser) {
        return res.status(401).send('Nicht autorisiert');
    }
    res.status(200).json(loggedInUser);
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
