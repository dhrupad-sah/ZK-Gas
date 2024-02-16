const express = require('express')
const router = express.Router();
const { getAllPolls, postPoll, getAllPublicPolls } = require('../controllers/Poll.js')

//GET Routes : 
router.get('/getAllPolls', getAllPolls)
router.get('/getAllPublicPolls', getAllPublicPolls )

//POST Routes : 
router.post('/postPoll', postPoll)

module.exports = router