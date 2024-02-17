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

const getAllCommunityOfUser = async (req, res, next) => {
    try {
        const { userID } = req.body;
        const result = await User.find({ _id: new mongoose.Types.ObjectId(userID) }).select("communityID")

        res.status(200).json({
            data: result,
            custom: "Fetched all communities of the user!!"
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching all communities of the user"
        });
    }
};

async function createUserIfMetaMaskNotFound(metaMaskId) {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        metaMaskId: metaMaskId,
        userComments: [],
        communityID: [],
    });

    try {
        const result = await user.save().then(callBack => {
            console.log("User Created")
            return callBack._id
        })
    } catch (err) {
        console.log(err)
    }
}

const getMongoIDUsingMetamaskID = async (req, res, next) => {
    try {
        const { metaMaskID } = req.body;
        const result = await User.find({ metaMaskId: metaMaskID }).select("_id");

        if (result.length === 0) {
            const idFromMongo = createUserIfMetaMaskNotFound(metaMaskID)
            res.status(200).json({
                data: idFromMongo
            });
        } else {
            res.status(200).json({
                data: result[0]._id
            });
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching _id of the user"
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

const addPollForUser = async (req, res, next) => {
    try {
        const { userID, pollID } = req.body;

        User.updateOne({ _id: new mongoose.Types.ObjectId(userID) }, {
            $push: {
                verifiedPolls: pollID
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

const addCommunityOfUser = async (req, res, next) => {
    try {
        const { userID, communityID } = req.body;

        User.updateOne({ _id: new mongoose.Types.ObjectId(userID) }, {
            $push: {
                communityID: communityID
            }
        }).then(resultOfPushing => {
            console.log("Community Pushed : ")
            res.status(200).json({
                custom: "Community pushed Successfully!!"
            })
        }).catch(err => {
            console.log("Error in pushing the community for the user")
            console.log(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in Pushing community for User!!"
        });
    }
}

const createUser = async (req, res, next) => {
    try {
        const { metaMaskId } = req.body;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            metaMaskId: metaMaskId,
            userComments: [],
            communityID: [],
        });
        await user.save();
        console.log("User got created");
        res.status(200).json({
            custom: "User Created!!"
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in creating the User"
        });
    }
};

module.exports = { getAllUsers, createUser, addCommentForUser, getAllCommentsOfUser, getMongoIDUsingMetamaskID, addCommunityOfUser, getAllCommunityOfUser, addPollForUser };