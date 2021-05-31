<template>
  <div class="run-time">
    <div class="item-title no-select">
      <p>运转时间</p>
    </div>
    <div class="item-content">
      <run-time-chart :cdata="runTimeData" />
    </div>
  </div>
</template>
<script>
import RunTimeChart from './RunTimeChart'
export default {
  components: { RunTimeChart },
  data() {
    return {
      runTimeData: [
        {
          value: 163.6,
          name: '正常'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .run-time {
    display: inline-block;
    width: calc((50% - .1rem)/2);
    height: 2.2rem;
  }

</style>
