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
  created() {
  },
  watch: {
    cdata: {
      deep: true,
      handler(newData) {
        this.options = {
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
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
            type: 'line',
            data: newData.value
          }]
        }
      }
    }
  }
}
</script>
