const bodyParser = require('body-parser');
const express = require('express');
const mysql2 = require('mysql2');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use('/style', express.static(path.join(__dirname, 'style')));
// app.use('/js', express.static(path.join(__dirname, 'js')));
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ghodke@1100',
    database: 'gradious',
})
conn.connect(err =>
{
    if (err) {
        console.error('Failed to connect to MySQL:', err);
        process.exit(1);
    }
    console.log("database connnected");
});
app.get("/books", (req, res) =>
{
    let sql = 'Select * from books';
    conn.query(sql, (err, result) =>
    {
        if (err) {
            console.error('Failed to retrieve books:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to retrieve books' });
        }
        if (result.length == 0) {
            return res.json({ status: 'success', message: "database is empty" });
        }
        res.status(200).json(result);
    })
})

app.get('/books/:id', (req, res) =>
{
    let sql = `Select * from books where ${req.params.id}`;
    conn.query(sql, (err, result) =>
    {
        if (err) {
            console.error('Failed to retrieve books:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to retrieve books' });
        }
        if (result.length === 0) {
            return res.status(404).json({ status: 'fail', message: 'Book not found' });
        }
        res.status(200).json(result);
    });
})
app.post('/books', (req, res) =>
{
    let newBook = req.body;
    let sql = `INSERT INTO books (title, author, genre, publication_year, language, price, isbn, publisher, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let values = [newBook.title, newBook.author, newBook.genre, newBook.publication_year, newBook.language, newBook.price, newBook.isbn, newBook.publisher, newBook.rating];
    conn.query(sql, values, (err, result) =>
    {
        if (err) {
            console.error('Failed to create book:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to create book ' + err.message });
        }
        res.status(201).json({ id: result.id, ...values });
    })
})

app.put('/books/:id', (req, res) =>
{
    let updatedBooks = req.body;
    let sql = `UPDATE books SET ? WHERE ${req.params.id}`;
    conn.query(sql, updatedBooks, (err, result) =>
    {
        if (err) {
            console.error('Failed to update book:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to update book' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'fail', message: 'Book not found' });
        }
        res.status(200).json(result);
    });
});

app.delete('/books/:id', (req, res) =>
{
    let sql = `DELETE FROM books WHERE ${req.params.id}`;
    conn.query(sql, (err, result) =>
    {
        if (err) {
            console.error('Failed to delete book:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to delete book' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'fail', message: 'Book not found' });
        }
        res.status(204).json(result);
    });
});

app.use(bodyParser.json());
app.listen(8080, () =>
{
    console.log("server started");
})
