const express = require('express');
const router = express.Router();
const { getAllData, getDataByName,getDataByMemberID,updateMember } = require('../Controller/DataController');

// Route to fetch all data
router.get('/', getAllData);
router.get('/list', getAllData);
router.get('/list/:memberNo', getDataByMemberID);

router.post('/edit/:memberNo', updateMember);


// Route to fetch data by name
router.get('/search', getDataByName);

module.exports = router;
