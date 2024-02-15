const mongoose = require('mongoose');

const User = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    metaMaskId: { type: String, required: true },
    commentID: [{ type: String, required: false }],
})

module.exports = mongoose.model('User', User)