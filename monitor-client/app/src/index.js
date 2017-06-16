import {get, post} from './fetch.js';
import {collectMemory} from './memory.js';
import {platformUtil} from './platform.js';


class MonitorClient {
  constructor(options) {
    this.opt = options;
    this._autoMonitorMemory();
    this._autoMonitorPlatform()
  }

  _autoMonitorMemory() {
    let monitorMemoryGap = this.opt.monitorMemoryGap;
    let monitorMemoryURL = this.opt.monitorMemoryURL;
    if (Number.isInteger(monitorMemoryGap) && typeof monitorMemoryURL === "string") {
      setInterval(function () {
        let userID = 1234;
        let time = +new Date();
        let memoryInfo = collectMemory();
        let usedJSHeapSize = memoryInfo.usedJSHeapSize + Math.round(300000 * (Math.random() - 0.5));
        let totalJSHeapSize = memoryInfo.totalJSHeapSize + Math.round(1000000 * (Math.random() - 0.5));
        let jsHeapSizeLimit = memoryInfo.jsHeapSizeLimit + Math.round(1000000 * (Math.random() - 0.5));

        post(monitorMemoryURL, {
          'userID': userID,
          'time': time,
          'totalJSHeapSize': totalJSHeapSize,
          'usedJSHeapSize': usedJSHeapSize,
          'jsHeapSizeLimit': jsHeapSizeLimit
        }, function (responseData) {
          console.log(responseData);
        }, function (errMsg) {
          console.log(errMsg);
        });
      }, monitorMemoryGap);
    }
  }

  _autoMonitorPlatform() {
    let monitorPlatformURL = this.opt.monitorPlatforURL;
    let browser = platformUtil.getBrowser();
    let system = platformUtil.getSystem();

    post(monitorPlatformURL, {
      'browser': browser,
      'system': system
    });
  }
}

window.MonitorClient = MonitorClient;
