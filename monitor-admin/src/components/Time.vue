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
          this.chart = echarts.init(document.getElementById('chart_time'))
          self.drawChart(Data)
          self.clickAction()
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
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
              type: 'value'
            }
          ],
          series: [
            {
              name: 'whiteScreenTime',
              type: 'bar',
              stack: '加载时间',
              data: Data.map((item) => {
                return item.whiteScreenTime
              })
            },
            {
              name: 'domReadyTime',
              type: 'bar',
              stack: '加载时间',
              data: Data.map((item) => {
                return item.domReadyTime
              })
            },
            {
              name: 'onLoadTime',
              type: 'bar',
              stack: '加载时间',
              data: Data.map((item) => {
                return item.onLoadTime
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
