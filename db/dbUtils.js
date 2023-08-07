// db/dbUtils.js

const { Pool } = require('pg');
const { DB_CONNECTION_STRING } = process.env;

const pool = new Pool({
  connectionString: DB_CONNECTION_STRING,
});

async function addRowToTable(tableName, data) {
  const keysString = Object.keys(data).join(', ');
  const valuesArray = Object.values(data);

  const insertQuery = `
      INSERT INTO ${tableName} (${keysString})
      VALUES (${valuesArray.map((_, index) => `$${index + 1}`).join(', ')})
    `;

  try {
    const result = await pool.query(insertQuery, valuesArray);
    console.log('Record inserted successfully:', result.rowCount);
    return { error: '', result };
  } catch (error) {
    return { error: error.code, result: '' };
  }
}

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
  addRowToTable,
  getRowsFromTable,
};
