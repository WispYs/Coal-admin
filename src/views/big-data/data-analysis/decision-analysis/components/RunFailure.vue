<template>
  <div class="run-failure">
    <div class="item-title no-select">
      <p>运转故障</p>
    </div>
    <div class="item-content">
      <run-failure-list :cdata="failureData" />
    </div>
  </div>
</template>
<script>
import RunFailureList from './RunFailureList'

export default {
  components: { RunFailureList },
  data() {
    return {
      failureData: {
        config: [
          { label: '名称', field: 'name' },
          { label: '隐患信息', field: 'info' },
          { label: '隐患状态', field: 'runTime', align: 'center' }
        ],
        value: [
          { name: '设备1', info: '机器故障', runTime: '1天06:24:12' },
          { name: '设备2', info: '机器故障', runTime: '1天06:24:12' },
          { name: '设备3', info: '机器故障', runTime: '1天06:24:12' }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .run-failure {
    display: inline-block;
    width: calc(50% - .1rem);
    height: 2.2rem;
  }

</style>
