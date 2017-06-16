const platformUtil = {
  //检测浏览器版本
  getBrowser: function () {
    let userAgent = navigator.userAgent.toLowerCase();
    let browser = {
      "IE6": /msie 6.0/.test(userAgent), // IE6
      "IE7": /msie 7.0/.test(userAgent), // IE7
      "IE8": /msie 8.0/.test(userAgent), // IE8
      "IE9": /msie 9.0/.test(userAgent), // IE9
      "IE10": /msie 10.0/.test(userAgent), // IE10
      "IE11": /msie 11.0/.test(userAgent), // IE11
      "Edge": /edge/.test(userAgent), // IE11
      "LB": /lbbrowser/.test(userAgent), // 猎豹浏览器
      "UC": /ucweb/.test(userAgent), // UC浏览器
      "360": /360se/.test(userAgent), // 360浏览器
      "Baidu": /baidubrowser/.test(userAgent), // 百度浏览器
      "Sougou": /metasr/.test(userAgent), // 搜狗浏览器
      "Chrome": /chrome/.test(userAgent), //Chrome浏览器
      "Firefox": /firefox/.test(userAgent), // 火狐浏览器
      "Opera": /opera/.test(userAgent), // Opera浏览器
      "Safari": /safari/.test(userAgent) && !/chrome/.test(userAgent), // safire浏览器
      "QQ": /qqbrowser/.test(userAgent) //qq浏览器
    };
    for (let i in browser) {
      if (browser.hasOwnProperty(i) && browser[i] === true) {
        return i;
      }
    }
  },

  //检测操作系统
  getSystem: function () {
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
}

export {
  platformUtil
}