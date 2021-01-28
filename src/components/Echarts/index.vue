<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      handler(options) {
        if (options) {
          // 设置true清空echart缓存
          this.chart = this.$echarts.init(this.$el, 'macarons')
          this.setOptions(options)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
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
      // 初始化echart
      this.chart = this.$echarts.init(this.$el, 'macarons')
      this.setOptions(this.options)
    },
    setOptions(options) {
      this.chart.setOption(options, true)
    }
  }
}
</script>

<style>
</style>
