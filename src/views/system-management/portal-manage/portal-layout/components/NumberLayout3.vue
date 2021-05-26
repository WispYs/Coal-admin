<template>
  <div class="swiper-content">
    <div class="number-data-content">
      <div class="content-box">
        <div v-for="(it,index) in NumberData" :key="index" class="content-box__item">
          <img :src="require(`@/assets/images/number_data3_bg_${index+1}.png`)" alt="">
          <div class="item-info">
            <p>{{ it.value }}</p>
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
        name: '报警',
        value: 247
      },
      {
        name: '断电',
        value: 47
      },
      {
        name: '故障',
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
      width: calc((100% - 30px)/3);
      margin-right: 15px;
      color: #fff;
      img {
        width: 100%;
        z-index: 1;
      }
      .item-info {
        position: absolute;
        bottom: 20px;
        left: 0;
        z-index: 2;
        width: 100%;
        font-size: 14px;
        text-align: center;
        p {
          margin-bottom: 5px;
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
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
    &__item:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}

</style>
