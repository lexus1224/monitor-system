const platformUtil = {
  //检测浏览器版本
  getBrowserCategory: function () {
    let userAgent = navigator.userAgent.toLowerCase();
    let browser = {
      "IE6": /msie 6.0/.test(UserAgent), // IE6
      "IE7": /msie 7.0/.test(UserAgent), // IE7
      "IE8": /msie 8.0/.test(UserAgent), // IE8
      "IE9": /msie 9.0/.test(UserAgent), // IE9
      "IE10": /msie 10.0/.test(UserAgent), // IE10
      "IE11": /msie 11.0/.test(UserAgent), // IE11
      "Edge": /edge/.test(UserAgent), // IE11
      "LB": /lbbrowser/.test(UserAgent), // 猎豹浏览器
      "UC": /ucweb/.test(UserAgent), // UC浏览器
      "360": /360se/.test(UserAgent), // 360浏览器
      "Baidu": /baidubrowser/.test(UserAgent), // 百度浏览器
      "Sougou": /metasr/.test(UserAgent), // 搜狗浏览器
      "Chrome": /chrome/.test(UserAgent.substr(-33, 6)), //Chrome浏览器
      "Firefox": /firefox/.test(UserAgent), // 火狐浏览器
      "Opera": /opera/.test(UserAgent), // Opera浏览器
      "Safari": /safari/.test(UserAgent) && !/chrome/.test(UserAgent), // safire浏览器
      "QQ": /qqbrowser/.test(UserAgent) //qq浏览器
    };
    for (let i in browser) {
      if (browser.hasOwnProperty(i) && browser[i] === true) {
        return i;
      }
    }
  },

  //检测操作系统
  getOperateSystem: function () {
    let system = {
      win: false,
      mac: false,
      xll: false,
      ios: false,
      android: false,
      winMobile: false
    };

    let userAgent = navigator.userAgent;
    let platform = navigator.platform;

    system.win = (platform.indexOf('Win') === 0);
    system.mac = (platform.indexOf('Mac') === 0);
    system.xll = ((platform.indexOf('Xll') === 0 || platform.indexOf('Linux') === 0));

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
          system.win = 'Phone';
        }
        else {
          system.win = RegExp['$1'];
        }
      }
    }

    // 检测IOS版本
    if (system.mac && userAgent.indexOf('Mobile') > -1) {
      if (/CPU (?:iPhone )?OS (\d+_\d+)/i.test(userAgent)) {
        system.ios = 'ios'+parseInt(RegExp['$1'].replace('_', '.'));
      }
    }
    else if(system.mac){
      system.mac='macOS'
    }

    // 检测Android版本
    if (/Android (\d+\.\d+)/i.test(userAgent)) {
      system.android = 'Android'+parseInt(RegExp['$1']);
    }

    return system;
  }
}

export {
  platformUtil
}