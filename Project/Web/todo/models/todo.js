const mongoose = require("mongoose");



// 스키마 정의, 몽구스는 클래스라 new
const TodoSchema = new mongoose.Schema({

    
    value : String,
    doneAt: Date,
    order: Number,
});

TodoSchema.virtual("todoId").get(function (){

    return this._id.toHexString();
});
TodoSchema.set("toJSON",{
    virtuals: true,
});

module.exports = mongoose.model("Todo", TodoSchema);