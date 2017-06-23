const {db, mongoose} = require('../db/db');

// 定义并创建Schema
let platformSchema = new mongoose.Schema({
  userID: String,
  browserName: String,
  browserVersion: String,
  browserKernel: String,
  browserKernelVersion: String,
  systemName: String,
  systemVersion: String
});

module.exports = {
  db,
  platformSchema,
  mongoose
};