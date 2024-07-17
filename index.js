const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

// run the website on port 5000

const app = express();
const port = 5000;

app.set('view engine', 'ejs'); // Setting the engine to EJS
app.set('views', path.join(__dirname, 'views')); // Setting the directory with views

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Path to the database file
const dbPath = path.resolve(__dirname, 'dataForm.db');

// Connecting to a SQLite database (to form)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

db.on('error', (err) => {
    console.error('Database error:', err.message);
});

db.on('close', () => {
    console.log('Database connection closed.');
});

// Creating a table in the database (if it does not exist) (to form)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        surname TEXT,
        email TEXT,
        phone INTEGER,
        additionalMessage TEXT
    )`);
});

// Connection to the database
const dbLine = new sqlite3.Database('lineup.db');

// HTTP GET request support for day one and day two
app.get('/lineup/:year', (req, res) => {
    const year = req.params.year;
    dbLine.all('SELECT * FROM lineup WHERE Year = ?', [year], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Handling a GET request for the main page

app.get('/', (req, res) => {
    const message = req.query.message || ''; // Retrieving a message from a URL
    res.render('index', { message }); // Rendering the contact.ejs file with the passed context
});

app.get('/index', (req, res) => {
    const message = req.query.message || ''; // Retrieving a message from a URL
    res.render('index', { message }); // Rendering the contact.ejs file with the passed context
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/terms', (req, res) => {
    res.render('terms');
});

app.get('/privacy', (req, res) => {
    res.render('privacy');
});


// Handling a POST request from a form
app.post('/submit', (req, res) => {
    const { name, surname, email, phone, additionalMessage } = req.body;
    db.run(`INSERT INTO users (name, surname, email, phone, additionalMessage) VALUES (?, ?, ?, ?, ?)`, [name, surname, email, phone, additionalMessage], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error' });
        }
        // After successfully saving the data, passing the message in the URL
        const message = 'Thank you for your submission';
        res.render("index", {message});
    });
});


// Starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});