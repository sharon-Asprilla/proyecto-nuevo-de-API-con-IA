const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// --- Database Configuration ---
// IMPORTANT: Replace these with your actual SQL Server credentials.
const dbConfig = {
    user: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    server: 'YOUR_SERVER_NAME',
    database: 'YOUR_DATABASE_NAME',
    options: {
        encrypt: true, // Use this if you're on Azure
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

// --- API Endpoint ---
app.get('/api/users', async (req, res) => {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM Users`; // Assuming you have a 'Users' table
        res.json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Internal Server Error');
    }
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
