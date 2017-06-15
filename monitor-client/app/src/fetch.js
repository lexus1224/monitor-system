import ajax from '@fdaciuk/ajax';

const get = function(requestURL, succCB, errCB) {
	ajax().get(requestURL).then(function(response, xhr) {
		if (typeof succCB === "function") {
			succCB(response, xhr);
		}
	}).catch(function(response, xhr) {
		if (typeof errCB === "function") {
			errCB(response, xhr);
		}
	});
}

const post = function(requestURL, requestParams, succCB, errCB) {
	ajax().post(requestURL, requestParams).then(function(response, xhr) {
		if (typeof succCB === "function") {
			succCB(response, xhr);
		}
	}).catch(function(response, xhr) {
		if (typeof errCB === "function") {
			errCB(response, xhr);
		}
	});
}

export {
	get,
	post
}
