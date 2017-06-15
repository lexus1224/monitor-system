const collectMemory = function() {
	if (!window.performance) {
		return null;
	}
	
	return window.performance.memory;
}

export {
	collectMemory
}
