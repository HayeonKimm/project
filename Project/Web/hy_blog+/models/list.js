const mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: false,
    },
    sentence: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Lists', listSchema);
