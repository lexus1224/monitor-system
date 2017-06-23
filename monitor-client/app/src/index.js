import {get, post} from './fetch.js';
import {collectMemory, collectTime} from './performance';
import {getSystem, getBrowser} from './platform';
import cons from '../constant/constant';


class MonitorClient {
  constructor(options) {
    // this.opt = options;
    this._autoMonitorMemory();
    this._autoMonitorTime();
    this._autoMonitorPlatform();
    this._autoMonitorAPI()
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
    let UAcollect = [
      'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
      'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
      'Mozilla/5.0 (Windows NT 6.1; rv,2.0.1) Gecko/20100101 Firefox/4.0.1',
      'Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)',
      'Mozilla/5.0 (iPhone 7; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 MQQBrowser/7.4.1',
      'Mozilla/5.0 (iPhone 6; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 MQQBrowser/7.4.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2 ',
      'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.133 Safari/534.16',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.3.4000 Chrome/30.0.1599.101 Safari/537.36',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.84 Safari/535.11 SE 2.X MetaSr 1.0',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SV1; QQDownload 732; .NET4.0C; .NET4.0E; SE 2.X MetaSr 1.0)'
    ];
    UAcollect.forEach(function (ua) {
      let browser = getBrowser(ua);
      let browserName = browser.browserName;
      let browserVersion = browser.browserVersion;
      let browserKernel = browser.browserKernel;
      let browserKernelVersion = browser.browserKernelVersion;
      let system = getSystem(ua);
      let systemName = system.systemName;
      let systemVersion = system.systemVersion;
      let userID = 1234;
      post(monitorPlatformURL, {
        'userID': userID,
        'browserName': browserName,
        'browserVersion': browserVersion,
        'browserKernel': browserKernel,
        'browserKernelVersion': browserKernelVersion,
        'systemName': systemName,
        'systemVersion': systemVersion
      });
    });
  }

  _autoMonitorAPI() {
    let monitorAPIURL = cons.monitorAPIURL;
    post(monitorAPIURL, Modernizr, function (responseData) {
      console.log(responseData);
    }, function (errMsg) {
      console.log(errMsg);
    });
  }
}

window.MonitorClient = MonitorClient;
