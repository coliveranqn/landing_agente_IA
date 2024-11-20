// server.js
const express = require('express');
const cors = require('cors');
const { sql, connectToDb } = require('./db');
const app = express();

// Inicia el chatbot en el puerto 3002
require('./chatbot');

app.use(cors());
app.use(express.json());

connectToDb();

app.get('/api/products', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM productos`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
