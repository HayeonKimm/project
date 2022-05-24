const mongoose = require("mongoose");


const schemas =  new mongoose.Schema({

    goodsId:{
        type: Number,
        required:true,
        unique: true,

    },

    quantity : {

        type: Number,
        required: true,

    },

});


module.exports = mongoose.model("Cart", schemas);