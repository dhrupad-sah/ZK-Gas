const Poll = require('../models/Poll.js')
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

        res.status(200).json({
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

const getAllPolls = async (req, res, next) => {
    try {
        const result  = await Poll.find().exec()
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

module.exports = { postPoll, getAllPolls };