<template>
  <el-row>
    <div id="chart_platform" style="width:100%; height:600px;"></div>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
  import cons from '../constant/constant.js'

  export default {
    mounted () {
      let self = this
      let requestURL = cons.queryPlatformPath
      let systemStat = new Map(
        [
          ['WinPhone', 0],
          ['Windows', 0],
          ['macOS', 0],
          ['Android', 0],
          ['iOS', 0],
          ['Linux', 0],
          ['Others', 0]
        ]
      )
      let windowsStat = new Map(
        [
          ['WindowsXP', 0],
          ['Vista', 0],
          ['Win7', 0],
          ['Win8', 0],
          ['Win10', 0],
          ['WinNT', 0]
        ]
      )
      let androidStat = new Map(
        [
          ['Android4.0', 0],
          ['Android5.0', 0],
          ['Android6.0', 0],
          ['Android7.0', 0]
        ]
      )
      let iosStat = new Map(
        [
          ['iOS6', 0],
          ['iOS7', 0],
          ['iOS8', 0],
          ['iOS9', 0],
          ['iOS10', 0],
          ['iOS11', 0]
        ]
      )
      axios.get(requestURL)
        .then(function (responseData) {
          let platformInfo = responseData.data
          platformInfo.forEach(function (item) {
            let systemType = item.system
            if (systemType.indexOf('WinPhone') > -1) {
              let value = systemStat.get(['WinPhone'])
              systemStat.set(['WinPhone', ++value])
            } else if (systemType.indexOf('Win') > -1 || systemType.indexOf('Vista') > -1) {
              let version = systemType.toString()
              let sValue = systemStat.get(['Windows'])
              let wValue = windowsStat.get([version])
              systemStat.set(['Windows', ++sValue])
              windowsStat.set([version, ++wValue])
            } else if (systemType.indexOf('macOS') > -1) {
              let value = systemStat.get(['macOS'])
              systemStat.set(['macOS', ++value])
            } else if (systemType.indexOf('Android') > -1) {
              let version = systemType.toString()
              let sValue = systemStat.get(['Android'])
              let aValue = androidStat.get([version])
              systemStat.set(['Android', ++sValue])
              androidStat.set([version, ++aValue])
            } else if (systemType.indexOf('iOS') > -1) {
              let version = systemType.toString()
              let sValue = systemStat.get(['iOS'])
              let iValue = iosStat.get([version])
              systemStat.set(['iOS', ++sValue])
              iosStat.set([version, ++iValue])
            } else if (systemType.indexOf('Linux') > -1) {
              let value = systemStat.get(['Linux'])
              systemStat.set(['Linux', ++value])
            } else {
              let value = systemStat.get(['Others'])
              systemStat.set(['Others', ++value])
            }
          })
          this.systemData = this.strMapToObj(systemStat)
          this.windowsData = this.strMapToObj(windowsStat)
          this.androidData = this.strMapToObj(androidStat)
          this.iosData = this.strMapToObj(iosStat)
          this.chart = echarts.init(document.getElementById('chart_platform'))
          self.drawChart()
          self.clickAction()
        })
    },
    data () {
      return {
        legend: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'WinPhone', 'Others'],

        systemData: [
          {value: 335, name: 'Windows'},
          {value: 310, name: 'macOS'},
          {value: 234, name: 'Linux'},
          {value: 1048, name: 'Android'},
          {value: 251, name: 'iOS'},
          {value: 147, name: 'WinPhone'},
          {value: 102, name: 'Others'}
        ],
        windowsData: [
          {value: 350, name: 'XP'},
          {value: 679, name: 'win7'},
          {value: 279, name: 'win8'},
          {value: 1548, name: 'win10'}
        ],
        androidData: [
          {value: 335, name: 'Android4.0'},
          {value: 1679, name: 'Android5.0'},
          {value: 548, name: 'Android6.0+'}
        ],
        iosData: [
          {value: 335, name: 'ios7'},
          {value: 479, name: 'ios8'},
          {value: 979, name: 'ios9'},
          {value: 1548, name: 'ios10'}
        ]
      }
    },
    methods: {
      strMapToObj: function (strMap) {
        let obj = Object.create(null)
        for (let [k, v] of strMap) {
          obj[k] = v
        }
        return obj
      },
      drawChart: function (detailData) {
        let options = {
          tooltip: {
            trigger: 'item'
//            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: this.legend
          },
          series: [
            {
              name: '系统版本',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: detailData
            },
            {
              name: '操作系统',
              type: 'pie',
              radius: ['40%', '60%'],
              data: this.systemData
            }
          ]
        }
        this.chart.setOption(options)
      },
      clickAction: function () {
        let self = this
        this.chart.on('click', function (params) {
          let name = params.name
          switch (name) {
            case 'Windows':
              self.drawChart(self.windowsData)
              break
            case 'Android':
              self.drawChart(self.androidData)
              break
            case 'iOS':
              self.drawChart(self.iosData)
              break
            default:
              self.drawChart()
          }
        })
      }
    }
  }
</script>

<style>
</style>
