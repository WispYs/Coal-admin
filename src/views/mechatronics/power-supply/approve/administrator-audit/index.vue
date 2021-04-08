<template>
  <div>
    {{ title }}
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
