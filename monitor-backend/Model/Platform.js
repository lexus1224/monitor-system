const {db, platformSchema, mongoose} = require('../Schema/Platform');

// 根据Schema创建对应的model
let PlatformModel = db.model('Platform', platformSchema);

module.exports = {
  PlatformModel,
  mongoose
};