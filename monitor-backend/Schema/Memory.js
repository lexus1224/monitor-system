const {db, mongoose} = require('../db/db.js');

// 定义并创建Schema
let memorySchema = new mongoose.Schema({
  userID: String,
  time: Number,
  totalJSHeapSize: Number,
  usedJSHeapSize: Number,
  jsHeapSizeLimit: Number
});

module.exports = {
  db,
  memorySchema,
  mongoose
};