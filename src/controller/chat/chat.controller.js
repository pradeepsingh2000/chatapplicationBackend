const { tryCatchFn } = require("../../helper/tryCatch");
const message = require('../../constants/messageConstant');
const { addChat, addMessage, getMessages, getChat, userChat, rooms, getChatList } = require("../../services/chat/chat.service");
const { successResponse } = require("../../utils/responseHandler");
const Rooms = require("../../models/rooms");
const ChatList = require("../../models/chatlist");


const createMessage = tryCatchFn(async (req,res,next) =>{
    const data = await addMessage(req.body,req.user._id)
    return successResponse(
        res,
        200,
        message.SUCCESS,
        data
      )
})

const messages = tryCatchFn(async (req,res,next) => {
    const data = await getMessages(req.query)
    return successResponse(
        res,
        200,
        message.SUCCESS,
        data
      )
})

const getRooms = tryCatchFn(async(req,res,next) => {
    const data = await rooms()
    return successResponse(
        res,
        200,
        message.SUCCESS,
        data
    )
})

const getRoom = tryCatchFn(async(req,res,next) => {
    const data = await Rooms.findById(req.params.id)
    return successResponse(
        res,
        200,
        message.SUCCESS,
        data
    )
})


const chatList = tryCatchFn(async(req,res,next) =>{
    const data = await getChatList(req.params.id)
    return successResponse(
        res,
        200,
        message.SUCCESS,
        data
    )
})

const deleteUser = tryCatchFn(async(req,res,next) =>{
    const {roomId,userId} = req.body
    const data = await ChatList.deleteMany({roomId,userId})
    let io = req.app.get("io")
    io.to(roomId.toString()).emit('fetchList', (data) =>{
        
    })

    return successResponse(
        res,
        200,
        message.SUCCESS,
        data
    )
})




module.exports = {  createMessage,messages,getRooms ,getRoom,chatList,deleteUser }