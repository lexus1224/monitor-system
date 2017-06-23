<template>
  <el-row>
    <div id="chart_time" style="width:100%; height:600px;"></div>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
  import cons from '../constant/constant.js'

  export default {
    mounted () {
      let self = this
      let requestURL = cons.queryTimePath
      axios.get(requestURL)
        .then(function (responseData) {
          let Data = responseData.data
          self.chart = echarts.init(document.getElementById('chart_time'))
          self.drawChart(Data)
//          self.clickAction()
        })
    },
    data () {
      return {
        Data: []
      }
    },
    methods: {
      drawChart: function (Data) {
        let options = {
          title: {
            text: '页面加载时间'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['whiteScreenTime', 'domReadyTime', 'onLoadTime']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: Data.map((item) => {
                return item.time
              })
            }
          ],
          yAxis: [
            {
              name: 'ms',
              type: 'value'
            }
          ],
          series: [
            {
              name: 'onLoadTime',
              type: 'bar',
//              stack: '加载时间',
              data: Data.map((item) => {
                return item.onLoadTime
              })
            },
            {
              name: 'domReadyTime',
              type: 'bar',
//              stack: '加载时间',
              data: Data.map((item) => {
                return item.domReadyTime
              })
            },
            {
              name: 'whiteScreenTime',
              type: 'bar',
              barGap: '-100%',
//              stack: '加载时间',
              data: Data.map((item) => {
                return item.whiteScreenTime
              })
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
