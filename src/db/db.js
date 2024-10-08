const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
async function connectDB() {
  try {
    await mongoose.connect(url, options);
    return mongoose.connection;
  } catch (error) {
    throw error;
  }
}
module.exports = connectDB;