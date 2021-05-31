<template>
  <div class="decision-main">
    <div class="main-top">
      <div v-for="(it, index) in topData" :key="index" class="main-top__item">
        <p>{{ it.value }}</p>
        <span>{{ it.label }}</span>
      </div>
    </div>
    <div class="main-center">
      <nav-slider />
    </div>
    <div class="main-bottom">
      <div v-for="(it, index) in bottomData" :key="index" class="main-bottom__item">
        <p>{{ it.label }}</p>
        <span>{{ it.value }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import NavSlider from './NavSlider'
export default {
  components: { NavSlider },
  data() {
    return {
      topData: [
        { value: 4, label: '系统预警' },
        { value: 3, label: '系统报警' },
        { value: 2, label: '管理预警' },
        { value: 2, label: '管理报警' }
      ],
      bottomData: [
        { value: '未接入', label: '预警指标' },
        { value: '未接入', label: '预警报警' },
        { value: '未接入', label: '处置措施' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .decision-main {

    height: 4.72rem;
    background: url('~@/assets/images/big-data_decision_main_wrap.png') no-repeat;
    background-size: cover;
    .main-top {
      width: 7rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      &__item {
        width: 1.6rem;
        height: .8rem;
        text-align: center;
        background: url('~@/assets/images/big-data_decision_main_bg.png') no-repeat;
        background-size: cover;
        padding-top: .1rem;
        p {
          font-size: .3rem;
          line-height: .36rem;
        }
        span {
          font-size: .14rem;
          color: #fff;
        }
        &:nth-of-type(1) {
          p {
            color: #faad14;
          }
        }
        &:nth-of-type(2) {
          p {
            color: #f0294b;
          }
        }
        &:nth-of-type(3) {
          p {
            color: #16dfcb;
          }
        }
        &:nth-of-type(4) {
          p {
            color: #d061f5;
          }
        }
      }
    }
    .main-center {
      height: 2.56rem;
    }
    .main-bottom {
      width: 7rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      &__item {
        width: 2.24rem;
        height: 1.04rem;
        text-align: center;
        background: url('~@/assets/images/big-data_decision_main_bg2.png') no-repeat;
        background-size: cover;
        padding-top: .08rem;
        p {
          color: #1fefff;
          font-size:  .14rem;
          line-height: .22rem;
          margin-bottom: .2rem;
        }
        span {
          color: #fff;
          font-size: .12rem;
        }
      }
    }
  }

</style>
