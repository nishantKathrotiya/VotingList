const express = require('express');
const router = express.Router();
const { getAllData,getDataByMemberID,updateMember,addressUpdates } = require('../Controller/DataController');
const {getStatistics} = require("../Controller/AdminController");
const {isLoggedin, isAdmin, isUser} = require("../middleware/AuthMiddleware");

// Route to fetch all data

router.get('/address', addressUpdates);
router.get('/list',isLoggedin, getAllData);
router.get('/list/:memberNo',isLoggedin, getDataByMemberID);

router.post('/edit/:memberNo',isLoggedin, updateMember);

router.get('/statistic',isLoggedin, getStatistics);


module.exports = router;
