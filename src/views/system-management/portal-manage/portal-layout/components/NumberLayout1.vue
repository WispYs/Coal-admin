<template>
  <div class="swiper-content">
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
      name: '异常数量',
      value: 47
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

.number-data-content {
  padding:40px 20px 0;
  overflow: hidden;
  &__item {
    float: left;
    width: calc((100% - 45px)/4);
    margin-right: 15px;
    text-align: center;
    margin-bottom: 10px;
    .item-icon {
      width: 100%;
      height: 60px;
      background: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: $blueColor;
    }
    .item-tit {
      display: block;
      font-size: 13px;
    }

  }
  &__item:nth-of-type(4n) {
    margin-right: 0;

  }
}

</style>
