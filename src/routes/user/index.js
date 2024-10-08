const express = require('express')
const app = express();
const authentication = require('./authentication')
const chat = require('./chat')

app.use('/auth', authentication)
app.use('/chat',chat)

module.exports = app;