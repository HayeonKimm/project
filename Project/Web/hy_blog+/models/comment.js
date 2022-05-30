const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    sentence_co: {
        type: String,
        required: true,
    },

    Uni_num: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('Comment', commentSchema);
