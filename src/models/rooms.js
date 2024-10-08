const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const chatRoomSchema = new mongoose.Schema(
  {
    name:{
        type:String
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


chatRoomSchema.plugin(mongoosePaginate);

const Rooms = mongoose.model("Rooms", chatRoomSchema);

module.exports = Rooms;