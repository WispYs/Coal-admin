<template>
  <div class="preview-wrapper">
    <div class="preview-title">资源名称</div>
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
        name: '数值名称一',
        value: 99
      },
      {
        name: '数值名称二',
        value: 99
      }

    ]
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

.number-data-content {
  padding: 0 20px;
  overflow: hidden;
  .content-box {
    height: 160px;
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
        bottom: 5px;
        left: 10px;
        width: calc(100% - 10px);
        z-index: 2;
        b {
          display: block;
          font-size: 34px;
          line-height: 34px;
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
