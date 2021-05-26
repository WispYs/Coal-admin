<template>
  <div class="swiper-content">
    <div class="number-data-content">
      <div class="content-box">
        <div v-for="(it,index) in NumberData" :key="index" class="content-box__item">
          <img src="@/assets/images/number_data2_bg.png" alt="">
          <div class="item-info">
            <b>{{ it.value }}</b>
            <span>{{ it.name }}</span>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      NumberData: {}
    }
  },
  mounted() {
    this.NumberData = [
      {
        name: '通讯异常数量',
        value: 247
      },
      {
        name: '监控异常数量',
        value: 47
      }

    ]
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

.number-data-content {
  padding: 40px 20px 0;
  overflow: hidden;
  .content-box {
    height: 200px;
    display: flex;
    align-items: center;
    &__item {
      position: relative;
      float: left;
      width: calc((100% - 15px)/2);
      margin-right: 15px;
      color: #fff;
      img {
        width: 100%;
        z-index: 1;
      }
      .item-info {
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: calc(100% - 20px);
        z-index: 2;
        b {
          display: block;
          margin-bottom: 10px;
          font-size: 40px;
          line-height: 40px;
        }
        span {
          display: block;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

    }
    &__item:nth-of-type(2n) {
      margin-right: 0;
    }
  }
}

</style>
