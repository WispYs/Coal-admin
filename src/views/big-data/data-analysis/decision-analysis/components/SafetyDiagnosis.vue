<template>
  <div class="safety-diagnosis">
    <div class="item-title no-select">
      <p>安全动态诊断</p>
    </div>
    <div class="item-content">
      <div class="diagnosis-con">
        <img src="@/assets/images/big-data_decision_diagnosis.png" alt="">
        <div class="diagnosis-info">
          <p>{{ diagnosisData.value }}</p>
          <span>{{ diagnosisData.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      diagnosisData: {
        value: '3168',
        label: '安全生产监控(天)'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .safety-diagnosis {
    height: 2.22rem;
    .diagnosis-con {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-right: .3rem;
        width: 1.6rem;
        height: 1.4rem;
      }
      .diagnosis-info {
        text-align: center;
        p {
          font-size: .38rem;
          color: #1fefff;
        }
        span {
          @include ellipsis(100%);
          display: block;
          font-size: .18rem;
          color: #fff;
        }
      }
    }
  }

</style>
