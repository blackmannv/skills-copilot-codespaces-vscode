// Create Web Server
const express = require('express');
const app = express();

// Use static files
app.use(express.static('public'));

// Use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Use EJS
app.set('view engine', 'ejs');

// Use MySQL
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'list_app'
});

// Connect to MySQL
connection.connect();

// Create Web Server
app.listen(3000, () => {
  console.log('Start server port:3000');
});

// Routing
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('index.ejs', { items: results });
    }
  );
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

// Close MySQL connection
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});





