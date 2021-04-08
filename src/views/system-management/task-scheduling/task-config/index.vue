<template>
  <div v-loading="loading" class="task-iframe" :style="'height:'+ height">
    <iframe id="iframe" :src="src" frameborder="no" style="width: 100%;height: 100%;" scrolling="auto" />
  </div>
</template>
<script>
export default {
  name: 'TaskConfig',
  data() {
    return {
      src: this.$route.meta.externalUrl,
      // src: '/workflow/toWorkFlowModel',
      height: document.documentElement.clientHeight - 60 - 80 + 82 + 'px;',
      loading: true
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.loading = false
    }, 230)
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 60 - 80 + 82 + 'px;'
    }
  }
}
</script>

<style lang="css" scoped>
.task-iframe{
  margin-top: -20px;
}
</style>
