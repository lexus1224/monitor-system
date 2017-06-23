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

      axios.get(requestURL)
        .then(function (responseData) {
          let platformInfo = responseData.data
          platformInfo.forEach((item) => {
            let sName = item.systemName
            let flag = false
            if (self.systemNameCollect.length > 0) {
              self.systemNameCollect.forEach(function (i) {
                if (i.name === sName) {
                  i.value++
                  flag = true
                }
              })
            }
            if (!flag) {
              self.systemNameCollect.push({value: 1, name: sName})
            }

            let sVersion = item.systemVersion
            flag = false
            if (self.systemVersionCollect.length > 0) {
              self.systemVersionCollect.forEach(function (i) {
                if (i.name === sVersion && i.system === sName) {
                  i.value++
                  flag = true
                }
              })
            }
            if (!flag) {
              self.systemVersionCollect.push({value: 1, name: sVersion, system: sName})
            }
          })
          self.chart = echarts.init(document.getElementById('chart_platform'))
          self.drawChart()
          self.clickAction()
        })
    },
    data () {
      return {
        systemNameCollect: [],
        systemVersionCollect: []
//        legend: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'WinPhone', 'Others'],
      }
    },
    methods: {
      drawChart: function (detailData) {
        let options = {
          title: {
            text: '操作系统类型',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
//          legend: {
//            orient: 'vertical',
//            x: 'left',
//            data: this.legend
//          },
          series: [
            {
              name: '系统版本',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '40%'],
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
              radius: ['50%', '70%'],
              data: this.systemNameCollect
            }
          ]
        }
        this.chart.setOption(options)
      },
      clickAction: function () {
        let self = this
        this.chart.on('click', function (params) {
          self.drawChart(self.systemVersionCollect.filter(function (s) {
            return s.system === params.name
          }))
        })
      }
    }
  }

</script>

<style>
</style>
