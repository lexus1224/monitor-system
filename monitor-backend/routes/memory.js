const router = require('koa-router')()
const {MemoryModel, mongoose} = require('../Model/Memory.js');

router.prefix('/memory')

router.post('/log', async (ctx, next) => {
	let params = ctx.request.body;
	let userID = params.userID;
	let time = params.time;
	let totalJSHeapSize = params.totalJSHeapSize;
	let usedJSHeapSize = params.usedJSHeapSize;
	let jsHeapSizeLimit = params.jsHeapSizeLimit;
	
	let memory = new MemoryModel({
		'userID': userID,
		'time': time,
		'totalJSHeapSize': totalJSHeapSize,
		'usedJSHeapSize': usedJSHeapSize,
		'jsHeapSizeLimit': jsHeapSizeLimit
	});
	
	let result = await memory.save().then((memory) => {
		return memory;
	});
	
	ctx.body = result;
});

router.get('/query', async (ctx, next) => {
	let params = ctx.query;
	let userID = params.userID;
	let condition = userID ? {'userID': userID} : {}
	let result = await MemoryModel.find(condition).exec((err, memories) => {
		if (err)
		  return err;

		return memories;
	});
	
	ctx.body = result;
});

module.exports = router;