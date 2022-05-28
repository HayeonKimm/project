const mongoose = require('mongoose');

const listsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },

    sentence: {
        type: String,
        required: true,
        unique: false,
    },

    time: {
        type: String,
        required: false,
        unique: false,
    },
});

module.exports = mongoose.model('Lists', listsSchema);
