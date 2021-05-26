<template>
  <div class="preview-wrapper">
    <div class="preview-title">资源名称</div>
    <div class="number-data-content">
      <number-chart :cdata="NumberData" />
    </div>
  </div>
</template>
<script>
import NumberChart from './NumberChart'

export default {
  components: { NumberChart },
  data() {
    return {
      NumberData: {
        name: [],
        value: []
      }
    }
  },
  mounted() {
    this.NumberData = {
      name: '数值名称',
      value: 99
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

.number-data-content {
  overflow: hidden;
}

</style>
