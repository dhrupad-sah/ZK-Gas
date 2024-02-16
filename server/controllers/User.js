const User = require('../models/User.js');
const mongoose = require('mongoose');

const getAllUsers = async (req, res, next) => {
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

const getAllCommentsOfUser = async (req, res, next) => {
    try {
        const { userID } = req.body;
        const result = await User.find({ _id: new mongoose.Types.ObjectId(userID) }).select("userComments")
        
        res.status(200).json({
            data: result,
            custom: "Fetched all comments of the user!!"
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching all comments of the user"
        });
    }
};

const addCommentForUser = async (req, res, next) => {
    try {
        const { userID, commentString } = req.body;

        User.updateOne({ _id: new mongoose.Types.ObjectId(userID) }, {
            $push: {
                userComments: commentString
            }
        }).then(resultOfPushing => {
            console.log("Comment Pushed : ")
            res.status(200).json({
                custom: "Comment pushed Successfully!!"
            })
        }).catch(err => {
            console.log("Error in pushing the comment for the user")
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in Pushing Comments for User!!"
        });
    }
}

const createUser = async (req, res, next) => {
    try {
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

module.exports = { getAllUsers, createUser, addCommentForUser, getAllCommentsOfUser };