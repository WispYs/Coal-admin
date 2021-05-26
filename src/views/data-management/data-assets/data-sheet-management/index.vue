<template>
  <div :style="'height:'+ height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" top="200" />
  </div>
</template>
<script>
export default {
  name: 'DataSheetManagement',
  data() {
    return {
      src: this.$route.meta.externalUrl,
      // src: '/workflow/toWorkFlowModel',
      height: document.documentElement.clientHeight - 60 - 34 - 45 + 'px;',
      loading: true
    }
  },
  mounted: function() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 60 - 34 - 45 + 'px;'
    }
  }
}
</script>
