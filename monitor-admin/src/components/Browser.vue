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
      let browserStat = new Map(
        [
          ['IE', 0],
          ['Edge', 0],
          ['猎豹', 0],
          ['UC', 0],
          ['360', 0],
          ['百度', 0],
          ['搜狗', 0],
          ['Chrome', 0],
          ['Firefox', 0],
          ['Opera', 0],
          ['Safari', 0],
          ['QQ', 0]
        ]
      )
      let IEStat = new Map(
        [
          ['IE6', 0],
          ['IE7', 0],
          ['IE8', 0],
          ['IE9', 0],
          ['IE10', 0],
          ['IE11', 0]
        ]
      )
      axios.get(requestURL)
        .then(function (responseData) {
          let platformInfo = responseData.data
          platformInfo.forEach((item) => {
            let browserType = item.browser
            let value = browserStat.get([browserType])
            browserStat.set([browserType, ++value])
            if (browserType.indexOf('IE') > -1) {
              let value = IEStat.get([browserType])
              IEStat.set([browserType, ++value])
            }
          })
          this.browserData = this.strMapToObj(browserStat)
          this.IEData = this.strMapToObj(IEStat)
          this.chart = echarts.init(document.getElementById('chart_platform'))
          self.drawChart()
          self.clickAction()
        })
    },
    data () {
      return {
        legend: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'WinPhone', 'Others'],

        browserData: [],
        IEData: []
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
      drawChart: function () {
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
              name: 'IE版本',
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
              data: this.IEData
            },
            {
              name: '浏览器分类',
              type: 'pie',
              radius: ['40%', '60%'],
              data: this.browserData
            }
          ]
        }
        this.chart.setOption(options)
      }
    }
  }
</script>

<style>
</style>
