const express = require('express');
const router = express.Router();
const { dataset } = require('../controllers/dataController.js')

router.get('/data', dataset)

module.exports = router;