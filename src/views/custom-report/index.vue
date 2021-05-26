<template>
  <div v-loading="loading" :style="'height:'+ height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
  </div>
</template>

<script>
import { reportMixin } from '@/mixin/report'
export default {
  name: 'CustomReport',
  mixins: [reportMixin],
  data() {
    return {
      src: this.$route.meta.externalUrl
    }
  }
}
</script>

<style>

</style>
