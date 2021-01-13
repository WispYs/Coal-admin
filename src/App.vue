<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  .el-table--border {
    th.gutter:last-of-type {
      display: block!important;
    }
  }
</style>
