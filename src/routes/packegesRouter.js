const express = require('express');

const router = express.Router();

const { packages: ctrl } = require('../controllers');

router.post('/', ctrl.addPackage);

module.exports = router;
