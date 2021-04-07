<template>
  <div class="swiper-content">
    <el-carousel indicator-position="outside" arrow="never" :autoplay="false">
      <el-carousel-item v-for="item in 2" :key="item">
        <div class="backlog-board">
          <div v-for="it in backlogData" :key="it.num" class="backlog-board__item">
            <div class="item-content">
              <span>{{ it.title }}</span>
              <p>{{ it.num }}</p>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backlogData: [
        { title: '待阅文件', num: 66 },
        { title: '消息提示', num: 18 },
        { title: '待审评论', num: 23 },
        { title: '待上报', num: 12 },
        { title: '待确认', num: 28 },
        { title: '待审核项目', num: 20 }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

.backlog-board {
  padding:10px 20px;
  overflow: hidden;
  &__item {
    float: left;
    width: calc((100% - 30px)/3);
    margin-right: 15px;
    margin-bottom: 15px;
    .item-content {
      width: 100%;
      height: 80px;
      background: #f8f8f8;
      padding: 15px;
      span {
        display: block;
        font-size: 12px;
        color: #999;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      p {
        font-size: 28px;
        color: $blueColor;
      }
    }

  }
  &__item:nth-of-type(3n) {
    margin-right: 0;

  }
}

</style>
