<template>
  <div class="chart" id="calendarHeatmap" style="height:500px;width:100%" />
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
        data: [],
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getVirtulData(2016)
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
        this.chart = echarts.init(document.getElementById('calendarHeatmap'), 'macarons')
        this.setOptions()
      },
      setOptions() {
        this.chart.setOption({
          title: {
            top: 30,
            left: 'center',
            text: '2016年某人每天的步数'
          },
          tooltip: {},
          visualMap: {
            min: 0,
            max: 10000,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 65,
            textStyle: {
              color: '#000'
            }
          },
          calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 20],
            range: '2016',
            itemStyle: {
              borderWidth: 0.5
            },
            yearLabel: {
              show: false
            }
          },
          series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.data
          }
        })
      },
      getVirtulData(year) {
        var year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        for (var time = date; time < end; time += dayTime) {
          this.data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ]);
        }
      },
    }
  }

</script>
