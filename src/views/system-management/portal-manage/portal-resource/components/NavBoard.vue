<template>
  <div class="preview-wrapper">
    <div class="preview-title">资源名称</div>
    <el-carousel indicator-position="outside" arrow="never" :autoplay="false">
      <el-carousel-item v-for="item in 2" :key="item">
        <div class="nav-board">
          <div v-for="it in navData" :key="it.title" class="nav-board__item">
            <div class="item-icon">
              <img :src="it.icon" alt="" :width="it.width">
            </div>
            <span class="item-tit">{{ it.title }}</span>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => '标题栏'
    }
  },
  data() {
    return {
      navData: [
        { title: '任务调度', icon: require('@/assets/images/nav_icon_1.png') },
        { title: '大数据分析', icon: require('@/assets/images/nav_icon_2.png') },
        { title: 'GIS一张图', icon: require('@/assets/images/nav_icon_3.png') },
        { title: '消息管理', icon: require('@/assets/images/nav_icon_4.png') },
        { title: '一通三防', icon: require('@/assets/images/nav_icon_5.png') },
        { title: '生产调度', icon: require('@/assets/images/nav_icon_6.png') }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
.preview-wrapper {
  height: auto;
  .preview-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
  }
  ::v-deep {
    .el-carousel--horizontal,
    .el-carousel__container {
      height: 272px;
      overflow: hidden;
    }
    .el-carousel {
      padding-top: 42px;
      position: relative;
    }
    .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .el-carousel__indicators--outside {
      position: absolute;
      top: 4px;
      right: 20px;
      bottom: initial;
      left: initial;
      button {
        background-color: #999;
      }
    }
  }
}
.nav-board {
  padding:10px 20px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: $blueColor;
    }
    .item-tit {
      display: block;
      font-size: 13px;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

  }
  &__item:nth-of-type(4n) {
    margin-right: 0;

  }
}

</style>
