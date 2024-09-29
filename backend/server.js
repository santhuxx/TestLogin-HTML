const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3001;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kavindu@123',  
  database: 'userdb'
});


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
