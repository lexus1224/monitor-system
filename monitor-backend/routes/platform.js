const router = require('koa-router')()
const {PlatformModel} = require('../Model/Platform');

router.prefix('/platform')

router.post('/log', async (ctx, next) => {
  let params = ctx.request.body;
  let userID = params.userID;
  let browser = params.browser;
  let system = params.system;

  let platform = new PlatformModel({
    'userID': userID,
    'browser': browser,
    'system': system,
  });

  let result = await platform.save().then((platform) => {
    return platform;
  });

  ctx.body = result;
});

router.get('/query', async (ctx, next) => {
  let result = await PlatformModel.find({}).exec((err, platforms) => {
    if (err)
      return err;

    return platforms;
  });

  ctx.body = result;
});

module.exports = router;