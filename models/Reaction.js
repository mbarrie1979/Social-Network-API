const { Schema, model } = require('mongoose');

// reaction model/schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
    },
    reaction: {
        type: String,
        required: true,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    thought: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }


});




module.exports = reactionSchema