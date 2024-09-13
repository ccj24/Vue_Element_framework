<template>
  <div class="bar">
    <chart :option="barOption" width="50%" height="600px" style="float:left" />
    <chart :option="animationOption" width="50%" height="600px" style="float:left" />
    <chart :option="datasetOption" width="60%" height="400px" style="float:left;margin-top:-50px" />
    <chart :option="stackOption" width="60%" height="400px" style="float:left;margin-top:30px" />
  </div>
</template>
<script>
  import echarts from 'echarts'
  import chart from '@/components/chart/index.vue'
  export default {
    name: 'bar',
    components: {
      chart
    },
    data() {
      return {
        animationData1: [],
        animationData2: [],
        xAxisData: [],
        barOption: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['蒸发量', '降水量']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }],
          yAxis: [{
            type: 'value'
          }],
          dataZoom: [{ // 在图表内触发缩放
            type: 'inside'
          }],
          series: [{
              name: '蒸发量',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              itemStyle: {
                color: new echarts.graphic.LinearGradient( //柱条的颜色
                  0, 0, 0, 1,
                  [{
                      offset: 0,
                      color: '#83bff6'
                    },
                    {
                      offset: 0.5,
                      color: '#188df0'
                    },
                    {
                      offset: 1,
                      color: '#188df0'
                    }
                  ]
                )
              },
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
              name: '降水量',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              itemStyle: {
                color: new echarts.graphic.LinearGradient( //柱条的颜色
                  0, 0, 0, 1,
                  [{
                      offset: 0,
                      color: '#ffca7f'
                    },
                    {
                      offset: 0.5,
                      color: '#ffb146'
                    },
                    {
                      offset: 1,
                      color: '#ff9709'
                    }
                  ]
                )
              },
              markPoint: {
                data: [{
                    name: '年最高',
                    value: 182.2,
                    xAxis: 7,
                    yAxis: 183
                  },
                  {
                    name: '年最低',
                    value: 2.3,
                    xAxis: 11,
                    yAxis: 3
                  }
                ]
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            }
          ]
        },
        animationOption: {
          legend: {
            data: ['bar', 'bar2']
          },
          toolbox: {
            // y: 'bottom',
            feature: {
              magicType: {
                type: ['stack', 'tiled']
              },
            }
          },
          tooltip: {},
          xAxis: {
            data: [],
            splitLine: {
              show: false
            }
          },
          yAxis: {},
          series: [{
            name: 'bar',
            type: 'bar',
            data: [],
            animationDelay: function (idx) {
              return idx * 10;
            }
          }, {
            name: 'bar2',
            type: 'bar',
            data: this.animationData2,
            animationDelay: function (idx) {
              return idx * 10 + 100;
            }
          }],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5;
          }
        },
        datasetOption: {
          dataset: { //数据集
            source: [
              ['score', 'amount', 'product'],
              [89.3, 58212, 'Matcha Latte'],
              [57.1, 78254, 'Milk Tea'],
              [74.4, 41032, 'Cheese Cocoa'],
              [50.1, 12755, 'Cheese Brownie'],
              [89.7, 20145, 'Matcha Cocoa'],
              [68.1, 79146, 'Tea'],
              [19.6, 91852, 'Orange Juice'],
              [10.6, 101852, 'Lemon Juice'],
              [32.7, 20112, 'Walnut Brownie']
            ]
          },
          grid: {
            left: '30',
            containLabel: true
          },
          xAxis: {
            name: 'amount'
          },
          yAxis: {
            type: 'category'
          },
          visualMap: {
            orient: 'horizontal', // 垂直放置
            left: 'center',
            bottom:'0',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            dimension: 0, // 数据的『哪个维度』
            inRange: {
              color: ['#D7DA8B', '#E15457']
            }
          },
          series: [{
            type: 'bar',
            encode: { // 解码
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            }
          }]
        },
        stackOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          series: [{
              name: '直接访问',
              type: 'bar',
              stack: '总量',// 堆叠效果
              label: {// 数值大小显示
                show: true,
                position: 'insideRight'
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        for (var i = 0; i < 100; i++) {
          this.xAxisData.push('类目' + i);
          this.animationData1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
          this.animationData2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }
        this.animationOption.xAxis.data = this.xAxisData
        this.animationOption.series[0].data = this.animationData1
        this.animationOption.series[1].data = this.animationData2
      }
    }
  }

</script>
<style lang="scss" scoped>
  .bar {
    background: #fff;
    padding: 16px 5px 0 5px;
    min-height: 1400px;
  }

</style>
