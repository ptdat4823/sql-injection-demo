require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.get('/accounts', (req, res) => {
  const query = 'SELECT fullname, username, password FROM account';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching account data:', err);
      res.status(500).send('Error fetching account data');
      return;
    }
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const query = 'SELECT * FROM account WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching account data:', err);
      return res.status(500).json({ message: "Internal server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    const account = results[0];

    if (account.password === password) {
      return res.json({ username: account.username, fullname: account.fullname });
    } else {
      return res.status(401).json({ message: "Invalid username or password." });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});