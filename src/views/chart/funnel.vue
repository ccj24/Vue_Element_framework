<template>
  <div class="funnel">
    <chart :option="funnelOption" height="400px" style="float:left;width:40%" />
    <chart :option="customizeOption" height="600px" style="float:left;width:60%" />
  </div>
</template>
<script>
  import chart from '@/components/chart/index.vue'
  export default {
    name: 'funnel',
    components: {
      chart
    },
    data() {
      return {
        funnelOption: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
          },
          legend: {
            data: ['展现', '点击', '访问', '咨询', '订单']
          },
          series: [{
            name: '漏斗图',
            type: 'funnel',
            width: '80%',
            // min: 0,// 指定的数据最小值
            // max: 100,// 指定的数据最大值
            minSize: '0%', // 数据最小值 min 映射的宽度
            // maxSize: '100%',// 数据最大值 max 映射的宽度
            orient: 'vertical', // 漏斗图朝向，支持配置为'vertical'（垂直）或者'horizontal'（水平）
            sort: 'descending', // 数据排序， 可以取 'ascending'，'descending'，'none'（表示按 data 顺序），或者一个函数（即 Array.prototype.sort(function (a, b) { ... })）。
            //funnelAlign: 'left',// 每一项对齐方式
            gap: 2, // 数据图形间距
            label: {
              show: true,
              position: 'inside'
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: { // 查询项的字体
                fontSize: 20
              }
            },
            data: [{
                value: 60,
                name: '访问'
              },
              {
                value: 40,
                name: '咨询'
              },
              {
                value: 20,
                name: '订单'
              },
              {
                value: 80,
                name: '点击'
              },
              {
                value: 100,
                name: '展现'
              }
            ]
          }]
        },
        customizeOption: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
          },
          legend: {
            data: ['展现', '点击', '访问', '咨询', '订单']
          },
          series: [{
              name: '预期',
              type: 'funnel',
              left: '10%',
              width: '80%',
              label: {
                formatter: '{b}预期'
              },
              labelLine: {
                show: false
              },
              itemStyle: {
                opacity: 0.7
              },
              emphasis: {
                label: {
                  position: 'inside',
                  formatter: '{b}预期: {c}%'
                }
              },
              data: [{
                  value: 60,
                  name: '访问'
                },
                {
                  value: 40,
                  name: '咨询'
                },
                {
                  value: 20,
                  name: '订单'
                },
                {
                  value: 80,
                  name: '点击'
                },
                {
                  value: 100,
                  name: '展现'
                }
              ]
            },
            {
              name: '实际',
              type: 'funnel',
              left: '10%',
              width: '80%',
              maxSize: '80%',
              label: {
                position: 'inside',
                formatter: '{c}%',
                color: '#fff'
              },
              itemStyle: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
              },
              emphasis: {
                label: {
                  position: 'inside',
                  formatter: '{b}实际: {c}%'
                }
              },
              data: [{
                  value: 30,
                  name: '访问'
                },
                {
                  value: 10,
                  name: '咨询'
                },
                {
                  value: 5,
                  name: '订单'
                },
                {
                  value: 50,
                  name: '点击'
                },
                {
                  value: 80,
                  name: '展现'
                }
              ]
            }
          ]
        }
      }
    },
    mounted() {
    },
    methods: {
    }
  }

</script>
<style lang="scss" scoped>
  .funnel {
    background: #fff;
    padding: 16px 5px 0 5px;
    min-height: 800px;
  }

</style>
