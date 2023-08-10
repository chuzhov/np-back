const { createPackageDataTable } = require('../../../db/dbUtils');

const createTableInDB = async (req, res) => {
  const { error } = createPackageDataTable('packages_data');
  if (!error) {
    res.status(200).json({ error: false });
  }
  if (error) {
    res.status(500).json({ error });
  }
};
module.exports = createTableInDB;
