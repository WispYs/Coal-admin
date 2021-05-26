/**
 * 报表混入
 * 用于报表公共数据、方法调用
 */
const reportMixin = {
  data() {
    return {
      height: document.documentElement.clientHeight - 60 - 80 + 'px;'
    }
  },
  created() {
  },
  mounted() {
    window.onresize = this.resizeIframe()
  },
  methods: {
    // 重设iframe
    resizeIframe() {
      this.height = document.documentElement.clientHeight - 60 - 80 + 'px;'
    }
  }
}

export {
  reportMixin
}
