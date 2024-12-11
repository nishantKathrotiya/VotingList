const express = require('express');
const router = express.Router();
const { getAllData, getDataByName,getDataByMemberID,updateMember,addressUpdates } = require('../Controller/DataController');
const {getStatistics , vote , getVoteDetails,unvote,newPoll} = require("../Controller/AdminController");
const { isLoggedin, isAdmin } = require('../middleware/AuthMiddleware');

// Route to fetch all data


router.get('/statistic',isLoggedin, getStatistics);
router.get('/getmembervote/:memberNo',isLoggedin, getVoteDetails);
router.get('/unvote/:memberNo',isLoggedin,isAdmin, unvote);
router.get('/newpoll',isLoggedin,isAdmin, newPoll);

router.post('/vote',isLoggedin,isAdmin, vote);


module.exports = router;
