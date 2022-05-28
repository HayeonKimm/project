const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: Number,
        required: [true, 'Password is required!'],
        unique: false,
    },
});

module.exports = mongoose.model('User', UserSchema);
