// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

let todos = [];

// Route to get todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Route to add a new todo
app.post('/todos', (req, res) => {
    const todo = req.body.todo;
    if (todo) {
        todos.push(todo);
        res.status(201).json({ message: 'Todo added!' });
    } else {
        res.status(400).json({ message: 'Todo is required!' });
    }
});

// Route to remove a todo
app.delete('/todos/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        res.json({ message: 'Todo removed!' });
    } else {
        res.status(404).json({ message: 'Todo not found!' });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
