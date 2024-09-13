<template>
  <div class="tree">
    <chart :option="treeOption" height="400px" style="float:left;width:60%" />
  </div>
</template>
<script>
  import chart from '@/components/chart/index.vue'
  export default {
    name: 'tree',
    components: {
      chart
    },
    data() {
      return {
        treeOption: {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          legend: {
            top: 0,
            left: 0,
            orient: 'vertical',
            data: [{
                name: 'tree1',
                icon: 'rectangle'
              },
              {
                name: 'tree2',
                icon: 'rectangle'
              }
            ],
            borderColor: '#c23531'
          },
          series: {
            //edgeShape: 'polyline',直线
            lineStyle: {// 线宽度
                width: 1
            },   
            //layout: 'radial',// 圆圈        
            type: 'tree',
            name: 'tree2',
            data: [],
            top: '10px',
            left: '40px',
            symbolSize: 7, // 圆圈大小
            label: { // 非叶子节点文字样式（可以通过改变文字的定位，从而改变数的走向）
              position: 'left',
              verticalAlign: 'middle',
              align: 'right' // 右对齐
            },
            leaves: { // 叶子节点文字样式
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        var data2 = {
          "name": "flare",
          "children": [{
              "name": "flex",
              "children": [{
                "name": "FlareVis",
                "value": 4116
              }]
            },
            {
              "name": "scale",
              "children": [{
                  "name": "IScaleMap",
                  "value": 2105
                },
                {
                  "name": "LinearScale",
                  "value": 1316
                },
                {
                  "name": "LogScale",
                  "value": 3151
                },
                {
                  "name": "OrdinalScale",
                  "value": 3770
                },
                {
                  "name": "QuantileScale",
                  "value": 2435
                },
                {
                  "name": "QuantitativeScale",
                  "value": 4839
                },
                {
                  "name": "RootScale",
                  "value": 1756
                },
                {
                  "name": "Scale",
                  "value": 4268
                },
                {
                  "name": "ScaleType",
                  "value": 1821
                },
                {
                  "name": "TimeScale",
                  "value": 5833
                }
              ]
            },
            {
              "name": "display",
              "children": [{
                "name": "DirtySprite",
                "value": 8833
              }]
            }
          ]
        };
        this.treeOption.series.data = [data2]
      }
    }
  }

</script>
<style lang="scss" scoped>
  .tree {
    background: #fff;
    padding: 16px 5px 0 5px;
    min-height: 800px;
  }

</style>
