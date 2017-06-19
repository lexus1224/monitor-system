const {db, mongoose} = require('../db/db');

// 定义并创建Schema
let timeSchema = new mongoose.Schema({
  userID: String,
  time: String,
  whiteScreenTime: Number,
  domReadyTime: Number,
  onLoadTime: Number
});

module.exports = {
  db,
  timeSchema,
  mongoose
};