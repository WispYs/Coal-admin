<template>
  <div class="equip-preview">
    <div class="item-title">
      <p>智能分析设备预览</p>
    </div>
    <div class="item-content">
      <div class="equip-preview__con">
        <div class="equip-preview__con__circle" />
      </div>
      <div class="equip-preview__bot">
        <div v-for="(it,index) in data" :key="index" class="equip-preview__bot__item">
          <p>{{ it.value }}</p>
          <span>{{ it.label }}</span>
          <em />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .equip-preview {
    float: left;
    width: 4.5rem;
    height: 100%;
    margin-right: .2rem;
    background: url('~@/assets/images/big-data_wisdom_bg1.png') no-repeat;
    background-size: cover;
    &__con {
      position: relative;
      margin-top: .2rem;
      height: 3.7rem;
      background: url('~@/assets/images/big-data_wisdom_equip.png') no-repeat center;
      background-size: cover;
      @keyframes moveCircle{
        0%,100%{
          top: .35rem;
        }
        50%{
          top: .6rem;
        }
      }
      &__circle {
        position: absolute;
        top: .3rem;
        left: 50%;
        width: .7rem;
        height: .7rem;
        transform: translateX(-50%);
        background: url('~@/assets/images/big-data_wisdom_equip_circle.png') no-repeat center;
        background-size: cover;
        animation: moveCircle 2s cubic-bezier(1, 1, 0, 0) infinite;
        -webkit-animation: moveCircle 2s cubic-bezier(1, 1, 0, 0) infinite;
      }

    }
    &__bot {
      height: 1.3rem;
      display: flex;
      justify-content: space-around;
      &__item {
        width: 1.3rem;
        height: 100%;
        padding-top: .1rem;
        text-align: center;
        p {
          font-size: .2rem;
          color: #2ff3fc;
        }
        span {
          @include ellipsis(100%);
          display: inline-block;
          margin: .1rem auto .05rem;
          font-size: .14rem;
          color: #fff;
        }
        em {
          display: block;
          margin: 0 auto;
          width: .74rem;
          height: .26rem;
        }
        &:nth-of-type(1) {
          em {
            background: url('~@/assets/images/big-data_wisdom_equip_icon1.png') no-repeat;
            background-size: cover;
          }
        }
        &:nth-of-type(2) {
          em {
            background: url('~@/assets/images/big-data_wisdom_equip_icon2.png') no-repeat;
            background-size: cover;
          }
        }
        &:nth-of-type(3) {
          em {
            background: url('~@/assets/images/big-data_wisdom_equip_icon3.png') no-repeat;
            background-size: cover;
          }
        }
      }
    }
  }

</style>
