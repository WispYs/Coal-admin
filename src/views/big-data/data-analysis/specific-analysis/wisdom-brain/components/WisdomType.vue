<template>
  <div class="wisdom-type">
    <div class="item-title">
      <p>智能分析类型</p>
    </div>
    <div class="item-content">
      <div class="wisdom-type__con">
        <p>{{ data.value }}</p>
        <span>{{ data.label }}</span>
      </div>
      <div class="wisdom-type__card">
        <div v-for="(it, index) in data.list" :key="index" class="wisdom-type__card__item">
          <img :src="require(`@/assets/images/big-data_wisdom_type_icon${index+1}.png`)" alt="">
          <p>{{ it.label }}</p>
          <span>{{ it.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
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
  .wisdom-type {
    float: right;
    width: 4.5rem;
    height: 100%;
    background: url('~@/assets/images/big-data_wisdom_bg1.png') no-repeat;
    background-size: cover;
    &__con {
      width: 2.4rem;
      height: 2.4rem;
      margin: .4rem auto;
      background: url('~@/assets/images/big-data_wisdom_type_pie.png') no-repeat;
      background-size: cover;
      padding-top: 1rem;
      text-align: center;
      p {
        font-size: .36rem;
        line-height: .4rem;
        color: #fff;
        margin-bottom: .45rem;
      }
      span {
        font-size: .18rem;
        color: #fff;
      }
    }
    &__card {
      display: flex;
      justify-content: space-around;
      &__item {
        text-align: center;
        img {
          width: .66rem;
          height: .83rem;
          margin-bottom: .15rem;
        }
        p {
          font-size: .14rem;
          color: #fff;
          margin-bottom: .1rem;
        }
        span {
          font-size: .2rem;
          color: #5bfcf4;
          font-weight: bold;
          text-shadow: 0 0 5px #5bfcf4;
        }
      }
    }
  }

</style>
