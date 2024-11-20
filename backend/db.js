// db.js
const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: { encrypt: true, enableArithAbort: true, trustServerCertificate: true },
};
console.log(process.env.DB_SERVER);
async function connectToDb() {
    try {
        await sql.connect(sqlConfig);
        console.log('Connected to SQL Server');
    } catch (err) {
        console.error('Database connection error:',sqlConfig, err);
    }
}

module.exports = { sql, connectToDb };
