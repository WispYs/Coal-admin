<template>
  <Echarts id="lineChart" :options="options" />
</template>
<script>
  import Echarts from '@/components/Echarts'

  export default {
    components: {
      Echarts
    },
    props: {
      cdata: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        options: {}
      }
    },
    watch: {
      cdata: {
        deep: true,
        handler(newData) {
          console.log(newData);
          this.options = {
            legend: {
              left: 'right',
              data: ['年度隐患统计趋势']
            },
            grid: {
              top: '10%',
              left: '2%',
              right: '3%',
              bottom: '2%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: newData.name
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: newData.value,
              type: 'line'
            }],
            series: [{
              name: '年度隐患统计趋势',
              type:'line',
              // stack: '总量',
              data: newData.value,
              markLine: {
                lineStyle:{
                  type:'dotted',
                  color:'red'
                },
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            }]
          }
        }
      }
    }
  }
</script>
