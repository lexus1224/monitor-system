<template>
  <el-row>
    <div id="chart_browser" style="width:50%; height:600px;"></div><div id="chart_kernel" style="width:50%; height:600px;"></div>
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
            let bName = item.browserName
            let flag = false
            if (self.browserNameCollect.length > 0) {
              self.browserNameCollect.forEach(function (i) {
                if (i.name === bName) {
                  i.value++
                  flag = true
                }
              })
            }
            if (!flag) {
              self.browserNameCollect.push({value: 1, name: bName})
            }

            let bVersion = item.browserVersion
            flag = false
            if (self.browserVersionCollect.length > 0) {
              self.browserVersionCollect.forEach(function (i) {
                if (i.name === bVersion && i.browser === bName) {
                  i.value++
                  flag = true
                }
              })
            }
            if (!flag) {
              self.browserVersionCollect.push({value: 1, name: bVersion, browser: bName})
            }
            self.chartLeft = echarts.init(document.getElementById('chart_browser'))
            self.drawChartLeft()
            self.clickActionLeft()

            let bKernel = item.browserKernel
            flag = false
            if (self.browserKernelCollect.length > 0) {
              self.browserKernelCollect.forEach(function (i) {
                if (i.name === bKernel) {
                  i.value++
                  flag = true
                }
              })
            }
            if (!flag) {
              self.browserKernelCollect.push({value: 1, name: bKernel})
            }

            let bkVersion = item.browserKernelVersion
            flag = false
            if (self.browserKernelVersionCollect.length > 0) {
              self.browserKernelVersionCollect.forEach(function (i) {
                if (i.name === bkVersion && i.kernel === bKernel) {
                  i.value++
                  flag = true
                }
              })
            }
            if (!flag) {
              self.browserKernelVersionCollect.push({value: 1, name: bkVersion, kernel: bKernel})
            }
          })
          self.chartRight = echarts.init(document.getElementById('chart_kernel'))
          self.drawChartRight()
          self.clickActionRight()
        })
    },
    data () {
      return {
//        legend: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'WinPhone', 'Others'],
        browserNameCollect: [],
        browserVersionCollect: [],
        browserKernelCollect: [],
        browserKernelVersionCollect: []
      }
    },
    methods: {
      drawChartLeft: function (detailData) {
        let options = {
          title: {
            text: '浏览器类型',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: this.browserNameCollect.map(function (s) {
              return s.name
            })
          },
          series: [
            {
              name: 'IE版本',
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
              name: '浏览器分类',
              type: 'pie',
              radius: ['50%', '70%'],
              data: this.browserNameCollect
            }
          ]
        }
        this.chartLeft.setOption(options)
      },
      drawChartRight: function (detailData) {
        let options = {
          title: {
            text: '浏览器内核',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data: this.browserKernelCollect.map(function (s) {
              return s.name
            })
          },
          series: [
            {
              name: 'IE版本',
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
              name: '内核分类',
              type: 'pie',
              radius: ['50%', '70%'],
              data: this.browserKernelCollect
            }
          ]
        }
        this.chartRight.setOption(options)
      },
      clickActionLeft: function () {
        let self = this
        this.chartLeft.on('click', function (params) {
          self.drawChartLeft(self.browserVersionCollect.filter(function (s) {
            return s.browser === params.name
          }))
        })
      },
      clickActionRight: function () {
        let self = this
        this.chartRight.on('click', function (params) {
          self.drawChartRight(self.browserKernelVersionCollect.filter(function (s) {
            return s.kernel === params.name
          }))
        })
      }
    }
  }
</script>

<style>
  #chart_browser, #chart_kernel {
    display: inline-block;
  }
</style>
