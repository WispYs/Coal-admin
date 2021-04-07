<template>
  <div v-loading="loading" class="task-iframe" :style="'height:'+ height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
  </div>
</template>

<script>
export default {
  name: 'TaskLog',
  data() {
    return {
      src: 'http://192.168.1.68:18020/joblog',
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
  margin-top:-20px;
}
</style>
