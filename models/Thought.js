const { Schema, model } = require('mongoose');

// thought model/schema
const thoughtSchema = new Schema({

    thought: {
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
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
    }],

}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
});

// for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema)


module.exports = Thought