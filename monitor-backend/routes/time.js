const router = require('koa-router')()
const {TimeModel} = require('../Model/Time');

router.prefix('/time')

router.post('/log', async (ctx, next) => {
  let params = ctx.request.body;
  let userID = params.userID;
  let time = params.time;
  let whiteScreenTime = params.whiteScreenTime;
  let domReadyTime = params.domReadyTime;
  let onLoadTime = params.onLoadTime;

  let timing = new TimeModel({
    'userID': userID,
    'time': time,
    'whiteScreenTime': whiteScreenTime,
    'domReadyTime': domReadyTime,
    'onLoadTime': onLoadTime
  });

  let result = await timing.save().then((time) => {
    return time;
  });

  ctx.body = result;
});

router.get('/query', async (ctx, next) => {
  let params = ctx.query;
  let userID = params.userID;
  let condition = userID ? {'userID': userID} : {}
  let result = await TimeModel.find(condition).exec((err, times) => {
    if (err)
      return err;

    return times;
  });
  console.log(result);
  ctx.body = result;
});

module.exports = router;