const express = require('express')
const router = express.Router();
const { getAllUsers, createUser, addCommentForUser, getAllCommentsOfUser, getMongoIDUsingMetamaskID, addCommunityOfUser,
     getAllCommunityOfUser, addPollForUser, getAllVerifiedPollsOfUser } = require('../controllers/User.js');

//GET Routes : 
router.get('/getAllUsers', getAllUsers);

//POST Routes : 
router.post('/createUser', createUser);
router.post('/getMongoDbIdUsingMetamask', getMongoIDUsingMetamaskID)

router.post('/addCommentForUser', addCommentForUser)
router.post('/getAllCommentsOfUser', getAllCommentsOfUser)

router.post('/addCommunityForUser', addCommunityOfUser)
router.post('/getAllCommunityOfUser', getAllCommunityOfUser)

router.post('/addPollIdToUser', addPollForUser)
router.post('/getAllVerifiedPollsOfUser', getAllVerifiedPollsOfUser)

module.exports = router