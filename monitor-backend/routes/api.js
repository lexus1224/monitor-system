const router = require('koa-router')()
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/monitor';

router.prefix('/api')

router.post('/log', async (ctx, next) => {
  let params = ctx.request.body;
  MongoClient.connect(DB_CONN_STR, function (err, db) {
    db.collection('apis').insert(params, function (err, result) {
      if (err) {

      }
      else {
        ctx.body = result;
      }
    });
  });
  ctx.body = params;
});

// router.get('/query', async (ctx, next) => {
//   let params = ctx.query;
//   let userID = params.userID;
//   let condition = userID ? {'userID': userID} : {}
//   let result = await TimeModel.find(condition).exec((err, times) => {
//     if (err)
//       return err;
//
//     return times;
//   });
//   console.log(result);
//   ctx.body = result;
// });

module.exports = router;