const express = require('express');
const app = express();
require('dotenv').config({ path: '' });
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/db');
const { createServer } = require('http'); 
const mainRoutes = require('./routes/index');
const { MESSAGE_CONSTANTS } = require('./constants/messageConstant');
const { addRooms } = require('./seeders/chat.seeder');
const { v4: uuidv4 } = require('uuid');

const { Server } = require('socket.io'); 
const Message = require('./models/message');
const ChatList = require('./models/chatlist');
const Users = require('./models/users');

// DB connection
connectDB()
  .then(() => {
    console.log('Database connected successfully');
    addRooms();
  })
  .catch((err) => {
    console.error('Error connecting to the database');
  });

// Creating the server with http
const server = createServer(app);

// Initializing Socket.io
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173"
    ],
    credentials: true 
  }
});

// Middleware configuration
app.use(express.json());
app.use(express.raw({ type: 'application/json' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173"],
  credentials: true,
}));

// API routes
app.use('/api', mainRoutes);
app.set("io", io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err, 'Error occurred');
  res.status(500).send('Something went wrong!');
});

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('Socket connected');

  socket.on("join chat", async ({ roomId ,userId}) => {
    try{
      const isUserOnline = await ChatList.find({roomId,userId})
      console.log(isUserOnline,'isUserOnline')
      if(!isUserOnline.length) await ChatList.create({roomId,userId}) 
      socket.join(roomId);
      io.to(roomId).emit("fetchList")
    }catch(err) {
      console.log('error in join Chat')
    }
    console.log("User Joined Room: " + roomId);
});

socket.on("remove_user",async ({roomId,userId}) =>{
    try{
        await ChatList.deleteMany({roomId,userId})
        io.to(roomId).emit("fetchList")
    }catch(err) {
      console.log("Error in remove user")
    }
})

socket.on("new_message",async (data) => {
  let {content,sender,roomId} = data
  let user = await Users.findById(sender)
  console.log(user,'the user')
  let senderObj = {
    _id:sender,
    user:user.name

  }

    let messageForRealTime = {
      content:content,
      _id:uuidv4(),
      sender:senderObj,
      roomId:roomId,
      createdAt: new Date().toISOString()
    }

    let objForDb = {
      content:content,
      sender:sender,
      roomId:roomId
    }
    try{
      const test = await Message.create(objForDb)
      io.to(roomId).emit("receive_message", messageForRealTime);
    }catch(err) {
      console.log(err)
    }
})

socket.on('disconnect', () => {
  console.log('User disconnected:', socket.id);

});

});

// Port configuration
const port = process.env.PORT || 8084;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
