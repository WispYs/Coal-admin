<template>
  <div class="swiper-content">
    <div class="project-board">
      <div v-for="it in 7" :key="it" class="project-board__item">
        <p>关于为业务拓展部负责人授予业务推广奖励的申请</p>
        <span>待办</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      projectData: [
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

.project-board {
  padding:52px 20px 10px;
  overflow: hidden;
  &__item {
    line-height: 24px;
    padding: 10px 0;
    padding-left: 30px;
    font-size: 14px;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    &::before {
      content: '';
      width: 4px;
      height: 4px;
      position: absolute;
      top: 50%;
      left: 13px;
      transform: translateY(-50%);
      border-radius: 50%;
      background: $blueColor;
    }
    &:last-of-type {
      border-bottom: none;
    }
    p {
      float: left;
      margin: 0;
      width: calc(100% - 70px);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span {
      width: 70px;
      height: 24px;
      background: $blueColor;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      float: right;
      font-size: 13px;
    }
  }
}

</style>
