const express = require('express');
const router = express.Router();
const { getAllData, getDataByName,getDataByMemberID,updateMember,addressUpdates } = require('../Controller/DataController');
const {getStatistics} = require("../Controller/AdminController")
// Route to fetch all data
router.get('/', getAllData);
router.get('/address', addressUpdates);
router.get('/list', getAllData);
router.get('/list/:memberNo', getDataByMemberID);

router.post('/edit/:memberNo', updateMember);

router.get('/statistic', getStatistics);


// Route to fetch data by name
router.get('/search', getDataByName);

module.exports = router;
