const express = require('express');
const router = express.Router();
const { getAllData, getDataByName,getDataByMemberID,updateMember,addressUpdates } = require('../Controller/DataController');
const {getStatistics , vote , getVoteDetails,unvote,newPoll} = require("../Controller/AdminController");

// Route to fetch all data


router.get('/statistic', getStatistics);
router.get('/getmembervote/:memberNo', getVoteDetails);
router.get('/unvote/:memberNo', unvote);
router.get('/newpoll', newPoll);

router.post('/vote', vote);


module.exports = router;
