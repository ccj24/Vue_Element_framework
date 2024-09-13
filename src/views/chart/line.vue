<template>
  <div class="line">
    <chart :option="lineOption" width="50%" style="float:left" />
    <chart :option="stackOption" width="50%" style="float:left" />
    <chart :option="markerOption" width="50%" style="float:left;margin-top:50px"/>
  </div>
</template>
<script>
  import chart from '@/components/chart/index.vue'
  export default {
    name: 'line',
    components: {
      chart
    },
    data() {
      return {
        chartData: {
          expectedData: [100, 120, 161, 134, 105, 160, 165],
          actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        lineOption: {
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false, // 坐标轴两边是否留白  
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            containLabel: true // grid 区域是否包含坐标轴的刻度标签
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
          },
          yAxis: {
            axisTick: { // 刻度尺
              show: false
            }
          },
          legend: {
            data: ['expected', 'actual']
          },
          series: [{
              name: 'expected',
              itemStyle: {
                normal: {
                  color: '#FF005A',
                  lineStyle: {
                    color: '#FF005A',
                    width: 2
                  }
                }
              },
              smooth: true,
              type: 'line',
              data: [],
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: 'actual',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: { // 折线下方区域是否有颜色
                    color: '#f3f8ff'
                  }
                }
              },
              data: [],
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }
          ]
        },
        stackOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: { // 对应xy轴值的颜色
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          toolbox: {
            feature: {
              saveAsImage: {} // 保存图片
            }
          },
          grid: {
            left: 20,
            right: 20,
            bottom: 20,
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {},
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ],
        },
        markerOption: {
          title: {
            text: '未来一周气温变化',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高气温', '最低气温']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {
                readOnly: false
              },
              magicType: {
                type: ['line', 'bar']
              },
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          grid: {
            left: 20,
            top: 50,
            containLabel: true
          },
          series: [{
              name: '最高气温',
              type: 'line',
              data: [11, 11, 15, 13, 12, 13, 10],
              smooth:false,
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            },
            {
              name: '最低气温',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              smooth:false,
              markPoint: {
                data: [{
                  name: '周最低',
                  type: 'min',
                }]
              },
              markLine: {
                data: [{
                    type: 'average',
                    name: '平均值'
                  },
                  [{
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  }, {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: '最大值'
                    },
                    type: 'max',
                    name: '最高点'
                  }]
                ]
              }
            }
          ]
        }
      }
    },
    mounted() {
      this.goData()
    },
    methods: {
      goData() {
        this.lineOption.series[0].data = this.chartData.expectedData
        this.lineOption.series[1].data = this.chartData.actualData
      }
    }
  }

</script>
<style lang="scss" scoped>
  .line {
    background: #fff;
    padding: 16px 5px 0 5px;
    min-height: 800px;
  }

</style>
