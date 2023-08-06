// db/dbUtils.js

const { Pool } = require('pg');
const { DB_CONNECTION_STRING } = process.env;

const pool = new Pool({
  connectionString: DB_CONNECTION_STRING,
});

// Example query function
async function getRowsFromTable(tableName) {
  try {
    const query = `SELECT * FROM ${tableName}`;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}

module.exports = {
  getRowsFromTable,
};
