const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 3002;

app.use(cors("*"));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'order_details'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID', connection.threadId);
});

// Get all users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Create a new user
app.post('/users', (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).send('name, email, and role are required');
    }

    const query = 'INSERT INTO users (name, email, role) VALUES (?, ?, ?)';
    connection.query(query, [name, email, role], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, name, email, role });
    });
});

// Paginated and filtered users
app.get('/users/search', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.q || '';

    const offset = (page - 1) * limit;
    const searchQuery = `%${search}%`;

    const countQuery = 'SELECT COUNT(*) as count FROM users WHERE name LIKE ? OR email LIKE ?';
    const dataQuery = 'SELECT * FROM users WHERE name LIKE ? OR email LIKE ? LIMIT ? OFFSET ?';

    connection.query(countQuery, [searchQuery, searchQuery], (err, countResults) => {
        if (err) {
            console.error('Error counting users:', err);
            return res.status(500).json({ error: err.message });
        }

        const total = countResults[0].count;

        connection.query(dataQuery, [searchQuery, searchQuery, limit, offset], (err, dataResults) => {
            if (err) {
                console.error('Error fetching users:', err);
                return res.status(500).json({ error: err.message });
            }

            res.json({
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalUsers: total,
                users: dataResults
            });
        });
    });
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
});

// Update user by ID
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).send('name, email, and role are required');
    }

    const query = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
    connection.query(query, [name, email, role, userId], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Create new order
app.post('/orders', (req, res) => {
    const { user_id, product_name, quantity } = req.body;

    if (!user_id || !product_name || !quantity) {
        return res.status(400).send('user_id, product_name, and quantity are required');
    }

    const query = 'INSERT INTO orders (user_id, product_name, quantity) VALUES (?, ?, ?)';
    connection.query(query, [user_id, product_name, quantity], (err, results) => {
        if (err) {
            console.error('Error creating order:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, user_id, product_name, quantity });
    });
});

// Get all orders
app.get('/orders', (req, res) => {
    connection.query('SELECT * FROM orders', (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a single order
app.get('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    connection.query('SELECT * FROM orders WHERE id = ?', [orderId], (err, results) => {
        if (err) {
            console.error('Error fetching order:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(results[0]);
    });
});

// Update order
app.put('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const { user_id, product_name, quantity } = req.body;

    const query = 'UPDATE orders SET user_id = ?, product_name = ?, quantity = ? WHERE id = ?';
    connection.query(query, [user_id, product_name, quantity, orderId], (err, results) => {
        if (err) {
            console.error('Error updating order:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Order updated successfully' });
    });
});

// Delete order
app.delete('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    connection.query('DELETE FROM orders WHERE id = ?', [orderId], (err, results) => {
        if (err) {
            console.error('Error deleting order:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Order deleted successfully' });
    });
});

// Handoff logic
app.post('/handoff', (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).send('user_id is required');
    }

    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        if (user.role === 'USER') {
            return res.json({ message: `Chatbot handing off to agent for user ${user.name}` });
        } else {
            return res.json({ message: 'User is already an agent. No handoff needed.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
