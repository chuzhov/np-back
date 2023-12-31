const { deleteRecordFromTable } = require('../../db/dbUtils');

const deletePackage = async (req, res) => {
  const idToDelete = req.params.id;

  const { error } = await deleteRecordFromTable('packages_data', idToDelete);

  if (!error) {
    res
      .status(200)
      .json({ success: true, id: parseInt(idToDelete), error: '' });
  } else {
    res
      .status(404)
      .json({ success: false, id: parseIntStr(idToDelete), error });
  }
};

module.exports = deletePackage;
