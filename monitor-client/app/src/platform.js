const getBrowser = function (userAgent) {
  // let userAgent = navigator.userAgent;
  let browserName = '';
  let browserVersion = '';
  let browserKernel = '';
  let browserKernelVersion = '';
  let browserCollect = {
    "IE": /msie/i.test(userAgent), // IE
    "Edge": /edge/i.test(userAgent), // Edge
    "猎豹": /lbbrowser/i.test(userAgent), // 猎豹浏览器
    "UC": /ucweb/i.test(userAgent), // UC浏览器
    "360": /360se/i.test(userAgent), // 360浏览器
    "百度": /baidubrowser/i.test(userAgent), // 百度浏览器
    "搜狗": /metasr/i.test(userAgent), // 搜狗浏览器
    "Firefox": /firefox/i.test(userAgent), // 火狐浏览器
    "Opera": /opera/i.test(userAgent), // Opera浏览器
    "Safari": /safari/i.test(userAgent) && !(/chrome/i.test(userAgent)), // safire浏览器
    "QQ": /qqbrowser/i.test(userAgent), //qq浏览器
    "Chrome": /chrome/i.test(userAgent) //Chrome浏览器
  };

  if (/msie\s(\d.\d)/i.test(userAgent)) {
    browserVersion = RegExp['$1'];
  } else if (/chrome\/(\d+.\d+)/i.test(userAgent)) {
    browserVersion = (RegExp['$1']).toString();
  } else if (/firefox\/(\d+.\d+)/i.test(userAgent)) {
    browserVersion = (RegExp['$1']).toString();
  } else if (/version\/(\d+.\d+)/i.test(userAgent)) {
    browserVersion = (RegExp['$1']).toString();
  } else if (/maxthon\s(\d+.\d+)/i.test(userAgent)) {
    browserVersion = (RegExp['$1']).toString();
  }

  if (/apple(webkit)\/(\d+.\d+)/i.test(userAgent)) {
    browserKernel = RegExp['$1'];
    browserKernelVersion = (RegExp['$2']).toString();
  } else if (/(trident)\/(\d.\d)/i.test(userAgent)) {
    browserKernel = RegExp['$1'];
    browserKernelVersion = (RegExp['$2']).toString();
  } else if (/(gecko)\/(\d+)/i.test(userAgent)) {
    browserKernel = RegExp['$1'];
    browserKernelVersion = (RegExp['$2']).toString();
  } else if (/(presto)\/(\d+.\d+)/i.test(userAgent)) {
    browserKernel = RegExp['$1'];
    browserKernelVersion = (RegExp['$2']).toString();
  } else {
    browserKernel = 'Others';
    browserKernelVersion = '';
  }

  for (let i in browserCollect) {
    if (browserCollect.hasOwnProperty(i) && browserCollect[i] === true) {
      browserName = i;
      break;
    }
  }

  return {
    browserName: browserName,
    browserVersion: browserVersion,
    browserKernel: browserKernel,
    browserKernelVersion: browserKernelVersion
  }

}

//检测操作系统
const getSystem = function (userAgent) {
  let system = {
    ios: false,
    android: false,
    win: false,
    mac: false
  };

  // let userAgent = navigator.userAgent;
  let systemName = '';
  let systemVersion = '';

  system.win = (userAgent.indexOf('Win') > -1) ? 'Windows' : '';
  system.ios = ((userAgent.indexOf('iPhone') > -1) || (userAgent.indexOf('iPad') > -1) || (userAgent.indexOf('iPod') > -1)) ? 'iOS' : '';
  system.mac = (userAgent.indexOf('Mac') > -1) && !(system.ios) ? 'OS X' : '';
  system.android = (userAgent.indexOf('Android') > -1) ? 'Android' : '';

  // 检测Windows操作系统
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(userAgent)) {
      if (RegExp['$1'] === 'NT') {
        switch (RegExp['$2']) {
          case '5.1':
            systemVersion = 'XP';
            break;
          case '6.0':
            systemVersion = 'Vista';
            break;
          case '6.1':
            systemVersion = 'Win7';
            break;
          case '6.2':
          case '6.3':
            systemVersion = 'Win8';
            break;
          case '6.4':
            systemVersion = 'Win10';
            break;
          default:
            systemVersion = 'WinNT';
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
  else if ((system.ios) && (/CPU (?:iPhone)?(?:iPad)?(?:iPod)? OS (\d+_\d+)(?:_\d)?/i.test(userAgent))) {
    systemVersion = RegExp['$1'].replace('_', '.');
  }

  // 检测Android版本
  else if (/Android (\d\.\d)(?:\.\d)?/i.test(userAgent)) {
    systemVersion = RegExp['$1'];
  }

  else {
    systemVersion = 'Others';
  }

  for (let i in system) {
    if (system.hasOwnProperty(i) && system[i]) {
      systemName = system[i]
    }
  }

  return {
    systemName: systemName,
    systemVersion: systemVersion
  }
}

export {
  getSystem,
  getBrowser
}