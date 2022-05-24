const mongoose = require("mongoose");

const listsSchema = new mongoose.Schema({
  
  
  
  title: {
    type: String,
    required: true,
    unique: false
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: String,
    required: true,
    unique: false
  },

  password: {

    type: Number,
    required: [true,'Password is required!'],
    unique: false

  },

  time: {

    type: String,
    required:false,
    unique: false
  


  }

});

module.exports = mongoose.model("Lists", listsSchema);