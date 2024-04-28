const { Schema, model } = require('mongoose');


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
    }

}, {
    toJSON: {
        getters: true
    }
});

const Thought = model('Thought', thoughtSchema)


module.exports = Thought