const {db, mongoose} = require('../db/db');

// 定义并创建Schema
let platformSchema = new mongoose.Schema({
  userID: String,
  browser: String,
  system: String
});

module.exports = {
  db,
  platformSchema,
  mongoose
};