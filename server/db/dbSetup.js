const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const runSqlFile = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'scripts', 'create_tables.sql'), 'utf-8');
    await client.connect();
    await client.query(sql);
    console.log('Tablas creadas exitosamente.');
  } catch (error) {
    console.error('Error al crear tablas:', error);
  } finally {
    await client.end();
  }
};

runSqlFile();
