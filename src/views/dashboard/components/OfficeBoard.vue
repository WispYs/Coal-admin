<template>
  <div class="swiper-content">
    <div class="office-board">
      <div v-for="it in 4" :key="it" class="office-board__item">
        <div class="item-content">
          <img src="@/assets/images/news.jpg" alt="">
          <div class="item-info">
            <p>地面电气维修工岗位操作标准岗位职责</p>
            <span>地面电气维修工岗位操作标准:岗位职责是维护变电所内高压开关、变压器...</span>
          </div>
        </div>
        <div class="item-time">发布时间：2021-4-2</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      officeData: [
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

.office-board {
  padding:42px 20px 10px;
  overflow: hidden;
  &__item {
    padding: 15px 0 10px;
    border-bottom: 1px solid #eee;
    &:last-of-type {
      border-bottom: none;
    }
    img {
      float: left;
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .item-info {
      margin-left: 50px;
      p {
        color: #333;
        width: 100%;
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      span {
        display: block;
        color: #878787;
        font-size: 13px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .item-time {
      margin-top: 4px;
      text-align: right;
      font-size: 13px;
      color: #999;
    }
  }
}

</style>
