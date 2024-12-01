const express = require('express');
const router = express.Router();
const { getAllData, getDataByName } = require('../Controller/DataController');

// Route to fetch all data
router.get('/', getAllData);

// Route to fetch data by name
router.get('/search', getDataByName);

module.exports = router;
