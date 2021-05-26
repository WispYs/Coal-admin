import { debounce } from '@/utils'

export default {
  data() {
    return {
      resizeHandler: null
    }
  },
  mounted() {
    this.resizeHandler = debounce(() => {
      // 调整浏览器窗口大小后，重新处理options对象
      this.normalizedOption(this.newData)
    }, 100)
    this.resizeChart()
  },
  beforeDestroy() {
    this.destroyResizeChart()
  },
  activated() {
    this.resizeChart()
  },
  deactivated() {
    this.destroyResizeChart()
  },
  methods: {
    resizeChart() {
      window.addEventListener('resize', this.resizeHandler)
    },
    destroyResizeChart() {
      window.removeEventListener('resize', this.resizeHandler)
    }
  }
}
