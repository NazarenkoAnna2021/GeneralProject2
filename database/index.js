const { Client } = require('pg');

const pgClient = new Client({
  user: '',
  host: 'localhost',
  database: '',
  password: '',
  port: 5432,
});

pgClient.connect().then(() => console.log('CONNECT TO DB'));

module.exports = pgClient;