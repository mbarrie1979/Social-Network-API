const { Schema, model } = require('mongoose');

// User model/schema
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
