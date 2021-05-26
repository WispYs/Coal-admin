<template>
  <div class="emergency-plan">
    <div class="item-title no-select">
      <p>应急值守</p>
    </div>
    <div class="item-content">
      <div class="emergency-con">
        <div v-for="(it, index) in emergencyData" :key="index" class="emergency-con__item">
          <img :src="it" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emergencyData: [
        require('@/assets/images/big-data_decision_emergency_1.png'),
        require('@/assets/images/big-data_decision_emergency_2.png')
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .emergency-plan {
    height: 1.9rem;
    .emergency-con {
      display: flex;
      justify-content: space-between;
      &__item {
        width: 2rem;
        height: 1.23rem;
        background: url('~@/assets/images/big-data_decision_emergency_bg.png') no-repeat;
        background-size: cover;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

</style>
