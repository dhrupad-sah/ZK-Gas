const mongoose = require('mongoose');

const Poll = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pollTitle: { type: String, required: true },
    belongsToCommunity: { type: Boolean, required: true },
    communityID: { type: String, required: false },
    option1: {
        optionName: { type: String, required: true },
        optionConsensus: { type: Number, required: true },
    },
    option2: {
        optionName: { type: String, required: true },
        optionConsensus: { type: Number, required: true },
    },
    option3: {
        optionName: { type: String, required: true },
        optionConsensus: { type: Number, required: true },
    },
    totalOptionConsensus: { type: Number, required: true },
});

module.exports = mongoose.model('Poll', Poll)