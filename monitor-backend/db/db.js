// 数据库链接
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/monitor');

let db = mongoose.connection;
db.on('error', function () {
  console.error('connection error:');
});
db.once('open', function () {
  console.log('connection opened');
});

module.exports = {
  db: db,
  mongoose: mongoose
};
