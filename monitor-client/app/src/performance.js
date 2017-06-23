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

  let timing = window.performance.timing;
  let timeCollector = {
    whiteScreenTime: timing.domLoading - timing.fetchStart,
    domReadyTime: timing.domContentLoadedEventEnd - timing.fetchStart,
    onLoadTime: timing.loadEventEnd - timing.fetchStart
  };
  return timeCollector;
};

export {
  collectMemory,
  collectTime
}
