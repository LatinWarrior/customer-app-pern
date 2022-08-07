const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const pool = require('./db');

const PORT = 8001;

// Middleware
app.use(cors());
// parse application/json
app.use(express.json());

// parse application/json
// app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/users', require('./routes/users'));
// app.use('/users/:id', require('./routes/users'));
// app.use('/users', require('./routes/users'));
// app.use('/users', require('./routes/users'));

app.get('/users', async (req, res, next) => {
    try {
        console.log(req.body);
        const results = await pool.query('SELECT * FROM users');
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: ${err.message}`);
    }
});

// Create a user.
app.post('/users', async (req, res, next) => {
    try {
        const { username } = req.body;
        console.log(`username: ${username}`);
        const newUser = await pool.query(
            `INSERT INTO users (username) VALUES ($1) RETURNING *`,
            [username]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: ${err.message}`);
    }
});

app.get('/users/:id', async (req, res, next) => {
    try {
        console.log(`req.params: ${req.params}`);
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [
            id,
        ]);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: ${err.message}`);
    }
});

// Delete a user
app.delete('/users/:id', async (req, res, next) => {
    try {
        console.log(`req.params: ${req.params}`);
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM users WHERE id = $1', [
            id,
        ]);
        res.status(204).json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: ${err.message}`);
    }
});

// Update a user.
app.put('/users/:id', async (req, res, next) => {
    try {
        // console.log(`req: ${JSON.stringify(req)}`);
        console.log(`In PUT`);
        const { id, username } = req.body;
        console.log(`username: ${username}`);
        const updatedUser = await pool.query(
            `UPDATE users SET username  = $2 WHERE id = $1`,
            [id, username]
        );
        console.log(updatedUser);
        res.status(200).json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error: ${err.message}`);
    }
});

// Update a user.

// Query all users.

// Query one user.

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});
