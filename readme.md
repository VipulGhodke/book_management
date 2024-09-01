# Express.js MySQL REST API

This is a simple REST API built with Express.js and MySQL.

## Setup

1. **Install dependencies**:
    ```bash
    npm init
    npm install express
    npm install body-parser
    npm install mysql2
    npm install nodemon
    ```

2. **Configure MySQL connection**:
    Update the `createConnection` method in `index.js` with your MySQL credentials:
    ```javascript
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'your-username',
        password: 'your-password',
        database: 'your-database-name'
    });
    ```

## Running the Server
Starting an application

Use `nodemon` to run the server:
```bash
nodemon index.js
hit the url in Browser
URL:http://localhost:8080/index.html

## API for testing

Get all books
Method: GET
URL: http://localhost:8080/books

Get a book with a particular ID
Method: GET
URL: http://localhost:8080/books/id={integer}

Add a new book
Method: POST
URL: http://localhost:8080/books
Request Body: JSON object of the new book
{
    "title": "Book Title",
    "author": "Author Name",
    "published_date": "YYYY-MM-DD"
}

Update book data
Method: PUT
URL: http://localhost:8080/books/id={integer}
Request Body: JSON object with updated book data
{
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "published_date": "YYYY-MM-DD"
}

Delete a book
Method: DELETE
URL: http://localhost:8080/books/id={integer}`

*****************************************************************************************
