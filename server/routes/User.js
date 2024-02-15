const express = require('express')
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/User.js');

//GET Routes : 
router.get('/getAllUsers', getAllUsers);

//POST Routes : 
router.post('/createUser', createUser);

module.exports = router