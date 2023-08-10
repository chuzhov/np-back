const express = require('express');

const router = express.Router();

const { packages: ctrl } = require('../controllers');

router.post('/create-table', ctrl.createTableInDB);
router.get('/', ctrl.getAllPackages);
router.post('/', ctrl.addPackage);
router.delete('/:id', ctrl.deletePackage);

module.exports = router;
