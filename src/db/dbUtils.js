// db/dbUtils.js

const { Pool } = require('pg');
const { DB_CONNECTION_STRING } = process.env;

const pool = new Pool({
  connectionString: DB_CONNECTION_STRING,
});

async function createPackageDataTable(tableName) {
  const query = `
    CREATE TABLE IF NOT EXISTS ${tableName} (

    id SERIAL PRIMARY KEY,
    _tracking_number VARCHAR(36) UNIQUE,
    _status VARCHAR(100),
    _alias VARCHAR(100),
    status VARCHAR(100),
    status_code VARCHAR(36),
    actual_delivery_date VARCHAR(36),
    date_created VARCHAR(36),
    warehouse_sender VARCHAR(100),
    warehouse_recipient VARCHAR(100),
    payment_status VARCHAR(36),
    cargo_description_string VARCHAR(100),
    city_recipient VARCHAR(36),
    city_sender VARCHAR(36),
    recipient_full_name VARCHAR(100),
    sender_full_name VARCHAR(100),
    document_cost VARCHAR(36),
    volume_weight VARCHAR(36),
    scheduled_delivery_date VARCHAR(36)
    )`;
  try {
    await pool.query(query);
    return { error: false };
  } catch (error) {
    console.error('Error executing query:', error);
    return { error: error.code };
  }
}

async function addRowToTable(tableName, data) {
  const keysString = Object.keys(data).join(', ');
  const valuesArray = Object.values(data);

  const insertQuery = `
      INSERT INTO ${tableName} (${keysString})
      VALUES (${valuesArray
        .map((_, index) => `$${index + 1}`)
        .join(', ')}) RETURNING id
    `;

  try {
    const result = await pool.query(insertQuery, valuesArray);
    console.log(
      'Record inserted successfully:',
      result.rowCount,
      ' id: ',
      result.rows[0].id
    );
    return { error: '', id: result.rows[0].id };
  } catch (error) {
    return { error: error.code, id: '' };
  }
}

async function getRowsFromTable(tableName) {
  try {
    const query = `SELECT * FROM ${tableName}`;
    const { rows } = await pool.query(query);
    return { error: '', hits: rows.length, rows };
  } catch (error) {
    return { error: error.code, hits: 0, rows: [] };
  }
}

async function deleteRecordFromTable(tableName, idToDelete) {
  const query = {
    text: `DELETE FROM ${tableName} WHERE id = $1`,
    values: [idToDelete],
  };

  try {
    const result = await pool.query(query);
    console.log('Deleted rows:', result.rowCount);
    return { error: '' };
  } catch (error) {
    console.error('Error deleting record:', error);
    return { error: error.code };
  }
}

module.exports = {
  pool,
  addRowToTable,
  createPackageDataTable,
  deleteRecordFromTable,
  getRowsFromTable,
};
