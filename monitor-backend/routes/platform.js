const router = require('koa-router')()
const {PlatformModel} = require('../Model/Platform');

router.prefix('/platform')

router.post('/log', async (ctx, next) => {
  let params = ctx.request.body;
  let userID = params.userID;
  let browserName = params.browserName;
  let browserVersion = params.browserVersion;
  let browserKernel = params.browserKernel;
  let browserKernelVersion = params.browserKernelVersion;
  let systemName = params.systemName;
  let systemVersion = params.systemVersion;

  let platform = new PlatformModel({
    'userID': userID,
    'browserName': browserName,
    'browserVersion': browserVersion,
    'browserKernel': browserKernel,
    'browserKernelVersion': browserKernelVersion,
    'systemName': systemName,
    'systemVersion': systemVersion
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