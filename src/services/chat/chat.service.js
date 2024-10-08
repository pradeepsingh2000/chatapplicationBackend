const ChatList = require("../../models/chatlist");
const Message = require("../../models/message");
const Rooms = require("../../models/rooms");
const { ObjectId } = require('mongoose').Types;  

const rooms = async () => {
  try {
    return await Rooms.find();
  } catch (error) {
    throw error;
  }
};

const addMessage = async (payload, sender) => {
  try {
    let add = {
      ...payload,
      sender: sender,
    };
    const data = await Message.create(add);
    return data;
  } catch (error) {
    throw error;
  }
};

const getMessages = async (payload) => {
  try {
    const { roomId } = payload;
    const data = await Message.find({ roomId }).populate('sender')
    return data;
  } catch (error) {
    throw error;
  }
};

const getChatList = async (id) => {
  try {
    const data = await ChatList.aggregate([
        {
            $match:{
                roomId:new ObjectId(id)
            }
        },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: { userId: "$userId", roomId: "$roomId" },
          document: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$document",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "result",
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      {
        $unwind:"$result"
      }
    ]);
    return data
  } catch (error) {
    throw error;
  }
};

module.exports = { addMessage, getMessages, rooms,getChatList };
