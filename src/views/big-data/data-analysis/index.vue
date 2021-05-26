<template>
  <div class="big-data-analysis">
    <router-view />
  </div>
</template>
<script>
import '@/utils/rem'
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.big-data-analysis {
  width: 100%;
  height: 100%;
  /*滚动条*/
  ::-webkit-scrollbar {
    width: 0px;
    height: 12px;
  }
}
</style>
