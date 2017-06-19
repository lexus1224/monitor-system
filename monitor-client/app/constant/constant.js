const domain = 'http://localhost:3000';

let cons = {
  'monitorMemoryGap': 1000,
  'monitorMemoryURL': domain + '/memory/log',
  'monitorTimeURL': domain + '/time/log',
  'monitorPlatformURL': domain + '/platform/log'
}

export default cons
