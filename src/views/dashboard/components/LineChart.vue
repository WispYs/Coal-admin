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
      handler(newData) {
        this.options = {
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
          }]
        }
      }
    }
  }
}
</script>
