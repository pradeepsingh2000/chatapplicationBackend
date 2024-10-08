const express = require('express')
const app = express();
const userRoutes = require('./user/index')
app.use('/user', userRoutes)
module.exports = app;