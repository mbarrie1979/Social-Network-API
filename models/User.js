const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            maxlength: 50,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

        toJSON: {
            getters: true,
            virtuals: true
        },
    }
);

// For friendcount
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;