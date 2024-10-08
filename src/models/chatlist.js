const mongoose = require("mongoose");

const chatListSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    roomId : {
        type : mongoose.Types.ObjectId,
        ref : "Rooms",
        required : true
    },
    isTyping: {
        type:Boolean,
        default:false
    }

},{timestamps: true})


 const ChatList = mongoose.model("ChatList",chatListSchema)
 module.exports = ChatList;