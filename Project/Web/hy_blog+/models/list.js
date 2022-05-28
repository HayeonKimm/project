const mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: 'Please enter your name',
        trim: true,
    },
    title: {
        type: String,
        required: 'Please enter your title',
        trim: true,
    },
    sentence: {
        type: String,
        required: 'Please enter your sentence',
    },
});
module.exports = mongoose.model('Lists', listSchema);
