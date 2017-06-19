/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const domain = 'http://localhost:3000';

let cons = {
  'monitorMemoryGap': 1000,
  'monitorMemoryURL': domain + '/memory/log',
  'monitorTimeURL': domain + '/time/log',
  'monitorPlatformURL': domain + '/platform/log'
}

/* harmony default export */ __webpack_exports__["a"] = (cons);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export get */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return post; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fdaciuk_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fdaciuk_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fdaciuk_ajax__);


const get = function(requestURL, succCB, errCB) {
	__WEBPACK_IMPORTED_MODULE_0__fdaciuk_ajax___default()().get(requestURL).then(function(response, xhr) {
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
	__WEBPACK_IMPORTED_MODULE_0__fdaciuk_ajax___default()().post(requestURL, requestParams).then(function(response, xhr) {
		if (typeof succCB === "function") {
			succCB(response, xhr);
		}
	}).catch(function(response, xhr) {
		if (typeof errCB === "function") {
			errCB(response, xhr);
		}
	});
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return collectMemory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return collectTime; });
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




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getBrowser; });
const getBrowser = function () {
  let userAgent = navigator.userAgent.toLowerCase();
  let browser = {
    "IE6": /msie 6.0/.test(userAgent), // IE6
    "IE7": /msie 7.0/.test(userAgent), // IE7
    "IE8": /msie 8.0/.test(userAgent), // IE8
    "IE9": /msie 9.0/.test(userAgent), // IE9
    "IE10": /msie 10.0/.test(userAgent), // IE10
    "IE11": /msie 11.0/.test(userAgent), // IE11
    "Edge": /edge/.test(userAgent), // IE11
    "猎豹": /lbbrowser/.test(userAgent), // 猎豹浏览器
    "UC": /ucweb/.test(userAgent), // UC浏览器
    "360": /360se/.test(userAgent), // 360浏览器
    "百度": /baidubrowser/.test(userAgent), // 百度浏览器
    "搜狗": /metasr/.test(userAgent), // 搜狗浏览器
    "Chrome": /chrome/.test(userAgent), //Chrome浏览器
    "Firefox": /firefox/.test(userAgent), // 火狐浏览器
    "Opera": /opera/.test(userAgent), // Opera浏览器
    "Safari": /safari/.test(userAgent) && !(/chrome/.test(userAgent)), // safire浏览器
    "QQ": /qqbrowser/.test(userAgent) //qq浏览器
  };
  for (let i in browser) {
    if (browser.hasOwnProperty(i) && browser[i] === true) {
      return i;
    }
  }
}

//检测操作系统
const getSystem = function () {
  let system = {
    ios: false,
    android: false,
    winMobile: false,
    win: false,
    mac: false,
    linux: false
  };

  let userAgent = navigator.userAgent;
  let platform = navigator.platform;

  system.win = (platform.indexOf('Win') === 0);
  system.mac = (platform.indexOf('Mac') === 0);
  system.linux = ( platform.indexOf('Linux') > -1) ? 'Linux' : false;

  // 检测Windows操作系统
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(userAgent)) {
      if (RegExp['$1'] === 'NT') {
        switch (RegExp['$2']) {
          case '5.1':
            system.win = 'WindowsXP';
            break;
          case '6.0':
            system.win = 'Vista';
            break;
          case '6.1':
            system.win = 'Win7';
            break;
          case '6.2':
          case '6.3':
            system.win = 'Win8';
            break;
          case '6.4':
            system.win = 'Win10';
            break;
          default:
            system.win = 'WinNT';
            break;
        }
      }
      else if (RegExp['$1'] === 'Ph') {
        system.win = 'WinPhone';
      }
      else {
        system.win = RegExp['$1'];
      }
    }
  }

  // 检测iOS版本
  if (system.mac && userAgent.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone )?OS (\d)(?:_\d)+/i.test(userAgent)) {
      system.ios = 'iOS' + RegExp['$1'];
    }
  }
  else if (system.mac) {
    system.mac = 'macOS'
  }

  // 检测Android版本
  if (/Android (\d)(?:\.\d)+/i.test(userAgent)) {
    system.android = 'Android' + parseInt(RegExp['$1']) + '.0';
  }

  for (let i in system) {
    if (system.hasOwnProperty(i) && system[i]) {
      return system[i]
    }
  }
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__performance__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constant_constant__ = __webpack_require__(0);






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
    let monitorMemoryGap = __WEBPACK_IMPORTED_MODULE_3__constant_constant__["a" /* default */].monitorMemoryGap;
    let monitorMemoryURL = __WEBPACK_IMPORTED_MODULE_3__constant_constant__["a" /* default */].monitorMemoryURL;
    if (Number.isInteger(monitorMemoryGap) && typeof monitorMemoryURL === "string") {
      setInterval(function () {
        let userID = 1234;
        let time = +new Date();
        let memoryInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__performance__["a" /* collectMemory */])();
        let usedJSHeapSize = memoryInfo.usedJSHeapSize + Math.round(300000 * (Math.random() - 0.5));
        let totalJSHeapSize = memoryInfo.totalJSHeapSize + Math.round(1000000 * (Math.random() - 0.5));
        let jsHeapSizeLimit = memoryInfo.jsHeapSizeLimit + Math.round(1000000 * (Math.random() - 0.5));

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* post */])(monitorMemoryURL, {
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
    let monitorTimeURL = __WEBPACK_IMPORTED_MODULE_3__constant_constant__["a" /* default */].monitorTimeURL;
    if (typeof monitorTimeURL === "string") {
      let userID = 1234;
      let time = new Date().toLocaleString();
      let timeInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__performance__["b" /* collectTime */])();
      let timeGap = setInterval(function () {
        if (timeInfo.onLoadTime > 0) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* post */])(monitorTimeURL, {
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
    let monitorPlatformURL = __WEBPACK_IMPORTED_MODULE_3__constant_constant__["a" /* default */].monitorPlatformURL;
    let browser = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform__["a" /* getBrowser */])();
    let system = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform__["b" /* getSystem */])();
    let userID = 1234;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* post */])(monitorPlatformURL, {
      'userID': userID,
      'browser': browser,
      'system': system
    });
  }
}

window.MonitorClient = MonitorClient;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * ajax - v2.1.6
 * Ajax module in Vanilla JS
 * https://github.com/fdaciuk/ajax

 * Wed May 24 2017 22:40:49 GMT-0300 (BRT)
 * MIT (c) Fernando Daciuk
*/
!function(e,t){"use strict"; true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?exports=module.exports=t():e.ajax=t()}(this,function(){"use strict";function e(e){var r=["get","post","put","delete"];return e=e||{},e.baseUrl=e.baseUrl||"",e.method&&e.url?n(e.method,e.baseUrl+e.url,t(e.data),e):r.reduce(function(r,o){return r[o]=function(r,u){return n(o,e.baseUrl+r,t(u),e)},r},{})}function t(e){return e||null}function n(e,t,n,o){var a=["then","catch","always"],s=a.reduce(function(e,t){return e[t]=function(n){return e[t]=n,e},e},{}),i=new XMLHttpRequest;return i.open(e,t,!0),i.withCredentials=o.hasOwnProperty("withCredentials"),r(i,o.headers),i.addEventListener("readystatechange",u(s,i),!1),i.send(c(n)),s.abort=function(){return i.abort()},s}function r(e,t){t=t||{},o(t)||(t["Content-Type"]="application/x-www-form-urlencoded"),Object.keys(t).forEach(function(n){t[n]&&e.setRequestHeader(n,t[n])})}function o(e){return Object.keys(e).some(function(e){return"content-type"===e.toLowerCase()})}function u(e,t){return function n(){t.readyState===t.DONE&&(t.removeEventListener("readystatechange",n,!1),e.always.apply(e,a(t)),t.status>=200&&t.status<300?e.then.apply(e,a(t)):e["catch"].apply(e,a(t)))}}function a(e){var t;try{t=JSON.parse(e.responseText)}catch(n){t=e.responseText}return[t,e]}function c(e){return s(e)?i(e):e}function s(e){return"[object Object]"===Object.prototype.toString.call(e)}function i(e){return Object.keys(e).reduce(function(t,n){var r=t?t+"&":"";return r+f(n)+"="+f(e[n])},"")}function f(e){return encodeURIComponent(e)}return e});

/***/ })
/******/ ]);