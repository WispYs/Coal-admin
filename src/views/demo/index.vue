<template>
  <div>
    <!-- Demo Page : {{ title }} -->
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  mounted() {
    this.title = this.$route.meta.title
  }
}
</script>
