const Database = require('better-sqlite3');
const db = new Database(process.env.DATABASE_NAME);

module.exports = db