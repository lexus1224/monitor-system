const {db, memorySchema, mongoose} = require('../Schema/Memory');

// 根据Schema创建对应的model
let MemoryModel = db.model('Memory', memorySchema);

module.exports = {
  MemoryModel,
  mongoose
};