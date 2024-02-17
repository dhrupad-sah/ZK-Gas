const express = require('express')
const router = express.Router();
const { getAllPolls, postPoll, getAllPublicPolls, getAllPollsByCommunityID, updateThePoll,getAllPrivatePollsForUser } = require('../controllers/Poll.js')

//GET Routes : 
router.get('/getAllPolls', getAllPolls)
router.get('/getAllPublicPolls', getAllPublicPolls )

//POST Routes : 
router.post('/postPoll', postPoll)
router.post('/getAllPollsOfCommunity', getAllPollsByCommunityID)
router.post('/updateThePoll', updateThePoll)
router.post('/getAllPrivatePolls', getAllPrivatePollsForUser)

module.exports = router