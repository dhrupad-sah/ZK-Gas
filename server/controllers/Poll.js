const Poll = require('../models/Poll.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

const postPoll = async (req, res, next) => {
    try {
        const { pollTitle, belongsToCommunity, communityID, option1, option2, option3, totalOptionConsensus } = req.body;

        const poll = new Poll({
            _id: new mongoose.Types.ObjectId(),
            pollTitle: pollTitle,
            belongsToCommunity: belongsToCommunity,
            communityID: communityID,
            option1: option1,
            option2: option2,
            option3: option3,
            totalOptionConsensus: totalOptionConsensus
        })

        const result = await poll.save()
        console.log("Poll Got Posted : ", result);
        console.log("The id would be: ", result._id)

        res.status(200).json({
            data: result._id,
            custom: "Poll Posted!!"
        })

    } catch (err) {
        console.log(err);
        res.status(403)
            .json({
                custom: "Error in posting the Poll"
            });
    }
};

const updateThePoll = async (req, res, next) => {
    try {
        const { _id, option1, option2, option3, totalOptionConsensus } = req.body;
        if (!_id) {
            return res.status(400).json({
                custom: "Poll ID is required for updating the poll",
            });
        }

        const updateObject = {};
        if (option1) updateObject['option1'] = option1;
        if (option2) updateObject['option2'] = option2;
        if (option3) updateObject['option3'] = option3;
        if (totalOptionConsensus) updateObject['totalOptionConsensus'] = totalOptionConsensus;

        const updatedPoll = await Poll.findByIdAndUpdate(
            _id,
            { $set: updateObject },
            { new: true } // Return the updated document
        );

        if (!updatedPoll) {
            return res.status(404).json({
                custom: "Poll not found with the provided ID",
            });
        }

        res.status(200).json({
            data: updatedPoll,
            custom: "Updated the poll"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            custom: "Error in updating the Polls",
        });
    }
};

const getAllPolls = async (req, res, next) => {
    try {
        const result = await Poll.find().exec()
        res.status(200).json({
            data: result,
            custom: "Fetched all polls!!"
        })

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching Polls"
        });
    }
}

const getAllPublicPolls = async (req, res, next) => {
    try {
        const result = await Poll.find({ belongsToCommunity: false });

        res.status(200).json({
            data: result,
            custom: "Fetched all public polls!!"
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching public polls"
        });
    }
};

const getAllPollsByCommunityID = async (req, res, next) => {
    try {
        const { communityID } = req.body;
        const result = await Poll.find({ communityID: communityID })

        res.status(200).json({
            data: result,
            custom: "Fetched all polls of the community ID!!"
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching all polls of the community ID"
        });
    }
};

const getAllPrivatePollsForUser = async (req, res, next) => {
    try {
        const { userID } = req.body
        const userCommunities = await User.find({ _id: new mongoose.Types.ObjectId(userID) }).select("communityID")
        console.log("userCommunities : " , userCommunities)
        console.log("userCommunities.communityID : ", userCommunities[0].communityID);
        if (!userCommunities || !userCommunities[0].communityID) {
            return res.status(404).json({
                custom: 'User not found or has no communityIDs',
            });
        }
        const resultPolls = await Poll.find({
            communityID: { $in: userCommunities[0].communityID },
        });

        res.status(200).json({
            data: resultPolls,
            custom: "Fetching all Community polls joined by the user successfully!!"
        });

    } catch (err) {
        console.log("Error in fetching polls from communities joined by user : ", err)
    }
}


module.exports = { postPoll, getAllPolls, getAllPublicPolls, getAllPollsByCommunityID, updateThePoll, getAllPrivatePollsForUser };