const { addRowToTable } = require('../../db/dbUtils');

//const io = require('../../socket');

const { getPackageData } = require('../../services');

const addPackage = async (req, res) => {
  const { trackingNumber, phoneNumber, alias = '' } = req.body;

  try {
    const {
      success,
      errors = [],
      warnings = [],
      data,
    } = await getPackageData(trackingNumber, phoneNumber);
    if (!success) {
      res.status(404).json({ success: false, errors, warnings });
      return false;
    }

    data._tracking_number = trackingNumber;
    data._alias = '';
    data._status = '';
    const { error, id } = await addRowToTable('packages_data', data);
    if (!error) {
      data.id = id;
      res.status(201).json({ success: true, warnings, data, error });
    }
    if (error === '23505') {
      res.status(409).json({
        success: false,
        warnings: [],
        data: {},
        error: 'Duplicate package number',
      });
    }
  } catch (error) {
    console.error('Error adding package:', error);
    res.status(500).json({
      success: false,
      warnings: [],
      data: {},
      error: 'Failed to add package',
    });
  }
};

module.exports = addPackage;
