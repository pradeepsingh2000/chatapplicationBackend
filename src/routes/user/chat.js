const express = require("express");
const router = express.Router();
const Validator = require("../../middleware/validator");
const Schema = require("../../validation/user");
const {
  createMessage,
  messages,
  getRooms,
  getRoom,
  chatList,
  deleteUser,
} = require("../../controller/chat/chat.controller");
const { VerifyUser } = require("../../middleware/authentication");

router.post(
  "/message",
  Validator(Schema.validateMessage),
  VerifyUser,
  createMessage
);

router.get("/messages", VerifyUser, messages);
router.get("/rooms",VerifyUser,getRooms);

router.get('/room/:id',VerifyUser,getRoom);

router.get('/chatList/:id',VerifyUser,chatList);

router.post('/deleteUser',VerifyUser,deleteUser)




router.all("*", (req, res) => {
  res.status(404).json({ error: "invalid route" });
});

module.exports = router;
