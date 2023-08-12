const { getRowsFromTable } = require('../../db/dbUtils');

const getAllPackages = async (req, res) => {
  const { error, rows, hits } = await getRowsFromTable('packages_data');
  console.log(error);
  if (error === '42P01') {
    res
      .status(404)
      .json({ error: 'Table packages_data is not exist in my DB', data: [] });
    return false;
  }
  if (error) {
    res.status(500).json({ error, data: [] });
  }
  if (!error) {
    res.status(200).json({ error: '', data: rows, hits });
  }
};

module.exports = getAllPackages;
