const {db, timeSchema, mongoose} = require('../Schema/Time');

// 根据Schema创建对应的model
let TimeModel = db.model('Time', timeSchema);

module.exports = {
  TimeModel,
  mongoose
};