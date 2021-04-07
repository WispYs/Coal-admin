<template>
  <div class="swiper-content">
    <el-carousel indicator-position="outside" arrow="never" :autoplay="false">
      <el-carousel-item v-for="item in 2" :key="item">
        <div class="nav-board">
          <div v-for="it in navData" :key="it.title" class="nav-board__item">
            <div class="item-icon"><i :class="it.icon" /></div>
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
        { title: '任务调度', icon: 'el-icon-sunset' },
        { title: '大数据分析', icon: 'el-icon-sunset' },
        { title: 'GIS一张图', icon: 'el-icon-sunset' },
        { title: '消息管理', icon: 'el-icon-sunset' },
        { title: '一通三防', icon: 'el-icon-sunset' },
        { title: '生产调度', icon: 'el-icon-sunset' },
        { title: '用户中心', icon: 'el-icon-sunset' },
        { title: '系统管理', icon: 'el-icon-sunset' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

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
      background: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: $blueColor;
      margin-bottom: 5px;
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
