const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender :{
        type : mongoose.Types.ObjectId,
        ref : "Users",
        required : true
    },
    roomId : {
        type : mongoose.Types.ObjectId,
        ref : "Rooms",
        required : true
    },
    content : String

},{timestamps: true})


 const Message = mongoose.model("Message",messageSchema)
 module.exports = Message;