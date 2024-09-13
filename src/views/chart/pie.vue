<template>
  <div class="pie">
    <chart :option="textOption" width="48%" height="500px" style="float:left;" />
    <chart :option="nestOption" width="52%" height="500px" style="float:left;" />
    <chart :option="customOption" width="100%" height="400px" style="float:left;" />
  </div>
</template>
<script>
  //import echarts from 'echarts'
  import chart from '@/components/chart/index.vue'
  export default {
    name: 'pie',
    components: {
      chart
    },
    data() {
      return {
        textOption: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            top: 0,
            left: 'center',
            data: ['西凉', '益州', '兖州', '荆州', '幽州']
          },
          series: [{
            name: '天气情况',
            type: 'pie',
            radius: ['50%', '70%'], // '65%'+center为实心圆
            //center: ['50%', '50%'],
            selectedMode: 'single', // 是否支持多个选中'single'，'multiple'
            data: [{
                value: 1548,
                name: '幽州',
                // label: {// 空心圆的label在圆心位置
                //   show: false,
                //   position: 'center'
                // },
                label: {
                  formatter: [ // 富文本
                    '{title|{b}}{abg|}',
                    '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                    '{hr|}',
                    '  {Sunny|Sunny}{value|202}{rate|55.3%}',
                    '  {Cloudy|Cloudy}{value|142}{rate|38.9%}',
                    '  {Showers|Showers}{value|21}{rate|5.8%}'
                  ].join('\n'),
                  backgroundColor: '#eee',
                  borderColor: '#777',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: { // 富文本样式
                    title: {
                      color: '#eee',
                      align: 'center'
                    },
                    abg: {
                      backgroundColor: '#333',
                      width: '100%',
                      align: 'right',
                      height: 25,
                      borderRadius: [4, 4, 0, 0]
                    },
                    Sunny: {
                      height: 30,
                      align: 'left',
                      backgroundColor: { // 放置图片
                        image: ''
                      }
                    },
                    Cloudy: {
                      height: 30,
                      align: 'left',
                      backgroundColor: {
                        image: ''
                      }
                    },
                    Showers: {
                      height: 30,
                      align: 'left',
                      backgroundColor: {
                        image: ''
                      }
                    },
                    weatherHead: {
                      color: '#333',
                      height: 24,
                      align: 'left'
                    },
                    hr: {
                      borderColor: '#777',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    value: {
                      width: 20,
                      padding: [0, 20, 0, 30],
                      align: 'left'
                    },
                    valueHead: {
                      color: '#333',
                      width: 20,
                      padding: [0, 20, 0, 30],
                      align: 'center'
                    },
                    rate: {
                      width: 40,
                      align: 'right',
                      padding: [0, 10, 0, 0]
                    },
                    rateHead: {
                      color: '#333',
                      width: 40,
                      align: 'center',
                      padding: [0, 10, 0, 0]
                    }
                  }
                }
              },
              {
                value: 535,
                name: '荆州'
              },
              {
                value: 510,
                name: '兖州'
              },
              {
                value: 634,
                name: '益州'
              },
              {
                value: 735,
                name: '西凉'
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        },
        customOption: {
          backgroundColor: '#2c343c', // 背景颜色
          title: { // 标题
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          visualMap: { // 颜色亮度变化
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [{
                value: 335,
                name: '直接访问'
              },
              {
                value: 310,
                name: '邮件营销'
              },
              {
                value: 274,
                name: '联盟广告'
              },
              {
                value: 235,
                name: '视频广告'
              },
              {
                value: 400,
                name: '搜索引擎'
              }
            ].sort(function (a, b) { // 本：顺时针排序，sort：逆时针排序
              return a.value - b.value;
            }),
            roseType: 'radius', // 每块有大小之分
            label: { // 提示文字样式
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: { // 提示线条样式
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: { // 每块颜色
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }]
        },
        nestOption: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 0,
            bottom: 0,
            data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
          },
          series: [{
              name: '访问来源',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'], //内环
              label: {
                position: 'inner'
              },
              labelLine: {
                show: false
              },
              data: [{
                  value: 335,
                  name: '直达',
                  selected: true // 默认选中
                },
                {
                  value: 679,
                  name: '营销广告'
                },
                {
                  value: 1548,
                  name: '搜索引擎'
                }
              ]
            },
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '55%'],
              label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                shadowBlur:3,//阴影
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: '#999',
                padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              data: [{
                  value: 335,
                  name: '直达'
                },
                {
                  value: 310,
                  name: '邮件营销'
                },
                {
                  value: 234,
                  name: '联盟广告'
                },
                {
                  value: 135,
                  name: '视频广告'
                },
                {
                  value: 1048,
                  name: '百度'
                },
                {
                  value: 251,
                  name: '谷歌'
                },
                {
                  value: 147,
                  name: '必应'
                },
                {
                  value: 102,
                  name: '其他'
                }
              ]
            }
          ]
        }
      }
    },
    mounted() {
      this.getPic()
    },
    methods: {
      getPic() {}
    }
  }

</script>
<style lang="scss" scoped>
  .pie {
    background: #fff;
    padding: 16px 5px 0 5px;
    min-height: 900px;
  }

</style>
