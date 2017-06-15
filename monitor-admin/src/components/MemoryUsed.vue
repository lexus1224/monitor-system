<template>
  <el-row>
    <div id="chart_memory" style="width:100%; height:600px;"></div>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
  import cons from '../constant/constant.js'

  export default {
    mounted () {
      let that = this
      let requestURL = cons.queryMemoryPath
      axios.get(requestURL)
        .then(function (responseData) {
          let memoryInfo = responseData.data
          that.drawChart(memoryInfo)
        })
    },
    methods: {
      drawChart: function (chartData) {
        let chart = echarts.init(document.getElementById('chart_memory'))
        let options = {
          title: {
            text: '内存使用分布情况'
          },
          tooltip: {
            trigger: 'axis',
            showDelay: 0,
            axisPointer: {
              show: true,
              type: 'cross',
              lineStyle: {
                type: 'dashed',
                width: 1
              }
            }
          },
          legend: {
            data: ['已使用内存', '可使用总内存']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              dataZoom: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: false
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              scale: true,
              axisTick: {
                alignWithLabel: true
              },
              data: (function () {
                let d = []
                let beginTimestamp = chartData[0].time
                chartData.forEach((data) => {
                  d.push(Math.round((data.time - beginTimestamp) / 1000))
                })
                return d
              })()
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Kb',
              boundaryGap: ['10%', '10%'],
              scale: true
            }
          ],
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }, {
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          series: [
            {
              name: '已使用内存',
              type: 'line',
              markPoint: {
                symbolSize: 65,
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              },
              data: (function () {
                let d = []
                chartData.forEach((data) => {
                  d.push(Math.round(data.usedJSHeapSize / 1024))
                })
                return d
              })()
            },
            {
              name: '可使用总内存',
              type: 'line',
              markPoint: {
                symbolSize: 65,
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              },
              data: (function () {
                let d = []
                chartData.forEach((data) => {
                  d.push(Math.round(data.totalJSHeapSize / 1024))
                })
                return d
              })()
            }
          ]
        }
        chart.setOption(options)
      }
    }
  }
</script>

<style>
</style>
