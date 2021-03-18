const { Client } = require('pg');

const db = new Client({
  user: 'jacobwpeterson',
  host: 'localhost',
  database: 'reviews',
  password: 'postgres',
  port: 5432,
});

db.connect();

module.exports = db;
