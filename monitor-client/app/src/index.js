import {get, post} from './fetch.js';
import {collectMemory, collectTime} from './performance';
import {getSystem, getBrowser} from './platform';
import cons from '../constant/constant'


class MonitorClient {
  constructor(options) {
    // this.opt = options;
    this._autoMonitorMemory();
    this._autoMonitorTime();
    this._autoMonitorPlatform()
  }

  _autoMonitorMemory() {
    // let monitorMemoryGap = this.opt.monitorMemoryGap;
    // let monitorMemoryURL = this.opt.monitorMemoryURL;
    let monitorMemoryGap = cons.monitorMemoryGap;
    let monitorMemoryURL = cons.monitorMemoryURL;
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
          'usedJSHeapSize': usedJSHeapSize,
          'totalJSHeapSize': totalJSHeapSize,
          'jsHeapSizeLimit': jsHeapSizeLimit
        }, function (responseData) {
          console.log(responseData);
        }, function (errMsg) {
          console.log(errMsg);
        });
      }, monitorMemoryGap);
    }
  }

  _autoMonitorTime() {
    let monitorTimeURL = cons.monitorTimeURL;
    if (typeof monitorTimeURL === "string") {
      let userID = 1234;
      let time = new Date().toLocaleString();
      let timeInfo = collectTime();
      let timeGap = setInterval(function () {
        if (timeInfo.onLoadTime > 0) {
          post(monitorTimeURL, {
            'userID': userID,
            'time': time,
            'whiteScreenTime': timeInfo.whiteScreenTime,
            'domReadyTime': timeInfo.domReadyTime,
            'onLoadTime': timeInfo.onLoadTime,
          }, function (responseData) {
            clearInterval(timeGap);
            console.log(responseData);
          }, function (errMsg) {
            console.log(errMsg);
          })
        }
      }, 300)
    }
  }

  _autoMonitorPlatform() {
    let monitorPlatformURL = cons.monitorPlatformURL;
    let browser = getBrowser();
    let system = getSystem();
    let userID = 1234;
    post(monitorPlatformURL, {
      'userID': userID,
      'browser': browser,
      'system': system
    });
  }
}

window.MonitorClient = MonitorClient;
