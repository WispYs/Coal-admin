<template>
  <div class="external-wrapper">
    <iframe id="iframe" :src="externalUrl" scrolling="yes" frameborder="0" width="100%" height="100%" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      externalUrl: ''
    }
  },
  mounted() {
    console.log(this.$route.meta.externalUrl)
    this.externalUrl = this.$route.meta.externalUrl || ''
    this.changeIframeHeight()
  },
  methods: {
    changeIframeHeight() {
      const iframe = document.getElementById('iframe')
      const deviceHeight = document.body.clientHeight
      iframe.style.height = (Number(deviceHeight) - 94) + 'px' // 94 = 60(headbar) + 34(tagsView)
    }
  }
}
</script>
<style lang="scss" scoped>
.external-wrapper {
  width: 100%;
  height: 100%;
}

</style>
