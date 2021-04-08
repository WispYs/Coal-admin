<template>
  <div class="page-container">
    <div class="calendar-wrapper">
      <el-calendar v-model="value" />

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: new Date()

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.calendar-wrapper {
  padding: 20px;
}
</style>
