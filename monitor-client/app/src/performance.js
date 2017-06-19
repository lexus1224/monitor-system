const collectMemory = function () {
  if (!window.performance) {
    return null;
  }

  return window.performance.memory;
};

const collectTime = function () {
  if (!window.performance) {
    return null;
  }

  let time = window.performance.time;
  let timeCollector = {
    whiteScreenTime: time.domLoading - time.fetchStart,
    domReadyTime: time.domComplete - time.fetchStart,
    onLoadTime: time.loadEventEnd - time.fetchStart
  };
  return timeCollector;
};

export {
  collectMemory,
  collectTime
}
