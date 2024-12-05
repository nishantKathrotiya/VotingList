const express = require('express');
const router = express.Router();
const { getAllData, getDataByName,getDataByMemberID,updateMember,addressUpdates } = require('../Controller/DataController');
const {getStatistics} = require("../Controller/AdminController");

// Route to fetch all data


router.get('/statistic', getStatistics);


module.exports = router;
