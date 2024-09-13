<template>
    <div class="chart" id="calendarPie" style="height:500px;width:100%" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from '@/components/chart/mixins/resize'
  export default {
    mixins: [resize],
    data() {
      return {
        chart: null,
        cellSize: [80, 80],
        pieRadius: 30,
        data: [],
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getVirtulData()
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById('calendarPie'), 'macarons')
        this.setOptions()
        setTimeout(() => {
          this.chart.setOption({
            series: this.getPieSeries(this.data, this.chart)
          });
        }, 10);
      },
      setOptions() {
        this.chart.setOption({
          tooltip: {},
          legend: {
            data: ['工作', '娱乐', '睡觉'],
            top: 0,
            right: 0,
          },
          calendar: {
            top: '60',
            left: 'center',
            orient: 'vertical',
            cellSize: this.cellSize,
            yearLabel: {
              show: true,
              textStyle: {
                fontSize: 30
              }
            },
            dayLabel: {
              margin: 5,
              firstDay: 1,
              nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            },
            monthLabel: {
              show: true
            },
            range: ['2017-02']
          },
          series: [{
            id: 'label',
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return echarts.format.formatTime('dd', params.value[0]);
                },
                offset: [-this.cellSize[0] / 2 + 10, -this.cellSize[1] / 2 + 10],
                textStyle: {
                  color: '#000',
                  fontSize: 14
                }
              }
            },
            data: this.data
          }]
        })
      },
      getVirtulData() {
        var date = +echarts.number.parseDate('2017-02-01');
        var end = +echarts.number.parseDate('2017-03-01');
        var dayTime = 3600 * 24 * 1000;
        for (var time = date; time < end; time += dayTime) {
          this.data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ]);
        }
      },
      getPieSeries(scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
          var center = chart.convertToPixel('calendar', item);
          return {
            id: index + 'pie',
            type: 'pie',
            center: center,
            label: {
              normal: {
                formatter: '{c}',
                position: 'inside'
              }
            },
            radius: 30,
            data: [{
                name: '工作',
                value: Math.round(Math.random() * 24)
              },
              {
                name: '娱乐',
                value: Math.round(Math.random() * 24)
              },
              {
                name: '睡觉',
                value: Math.round(Math.random() * 24)
              }
            ]
          };
        })
      }
    }
  }

</script>
