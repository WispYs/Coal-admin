<template>
  <div v-loading="loading" :style="'height:'+ height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
  </div>
</template>

<script>
export default {
  name: 'Workflow',
  data() {
    return {
      src: this.$route.meta.externalUrl,
      // src: 'http://www.baidu.com',
      height: document.documentElement.clientHeight - 60 - 80 + 'px;',
      loading: true
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.loading = false
    }, 230)
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 60 - 80 + 'px;'
    }
  }
}
</script>

<style>

</style>
