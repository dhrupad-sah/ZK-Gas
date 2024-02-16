const express = require('express')
const router = express.Router();
const { getAllUsers, createUser, addCommentForUser, getAllCommentsOfUser, getMongoIDUsingMetamaskID } = require('../controllers/User.js');

//GET Routes : 
router.get('/getAllUsers', getAllUsers);

//POST Routes : 
router.post('/createUser', createUser);
router.post('/addCommentForUser', addCommentForUser)
router.post('/getAllCommentsOfUser', getAllCommentsOfUser)
router.post('/getMongoDbIdUsingMetamask', getMongoIDUsingMetamaskID)

module.exports = router