const express = require('express')
const router = express.Router();
const { getAllPolls, postPoll } = require('../controllers/Poll.js')

//GET Routes : 
router.get('/getAllPolls', getAllPolls)

//POST Routes : 
router.post('/postPoll', postPoll)

module.exports = router