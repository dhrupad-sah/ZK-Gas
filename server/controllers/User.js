const User = require('../models/User.js');
const mongoose = require('mongoose');

const getAllUsers = async(req, res, next) => {
    try {
        const result = await User.find().exec()
        res.status(200).json({
            data: result,
            custom: "Fetched all Users!!"
        })

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching Users!!"
        });
    }
}

const createUser = async(req, res, next) => {
    try{
        const { metaMaskId, commentID, communityID } = req.body
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            metaMaskId: metaMaskId,
            commentID: commentID,
            communityID: communityID,
        })

        const result = user.save()
        console.log("User got created");

        res.status(200).json({
            custom: "User Created!!"
        })

    } catch (err) {
        console.log(err);
        res.status(403)
            .json({
                custom: "Error in creating the User"
            });
    }
}

module.exports = { getAllUsers, createUser };