const mongoose = require('mongoose');




// 유저 스키마 



const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: false,
        minlength:3,
    },
    password: {
        type: String,
        required: true,
        unique: false,
        minlength:4,
    },
    confirmPassword: {
        type: String,
        required: true,
        unique: false,
    },
});



UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});
UserSchema.set('toJSON', {
    virtuals: true,
});
module.exports = mongoose.model('User', UserSchema);
