<template>
  <div class="swiper-content">
    <div class="news-board">
      <div v-for="it in 3" :key="it" class="news-board__item">
        <div class="item-title">地面电气维修工岗位操作标准:岗位职责是维护变电所内高压开关</div>
        <p class="item-info">地面电气维修工岗位操作标准:岗位职责是维护变电所内高压开关、变压器、馈电开关、配电点移动变压器、供电线路及沿线接线盒，保证供电，高压开关、变压器、馈电开关、配电点移动变压器、供电线路及沿线接线盒，保证供电</p>
        <span class="item-time">发布时间：2021-4-2</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>

.news-board {
  padding: 45px 20px 10px;
  overflow: hidden;
  &__item {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    line-height: 20px;
    &:last-of-type {
      border-bottom: none;
    }
    .item-title {
      color: #333;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: 4px;
    }
    .item-info {
      color: #878787;
      width: 100%;
      margin: 0;
      font-size: 13px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .item-time {
      display: block;
      margin-top: 10px;
      font-size: 13px;
      color: #999;
    }

  }
}

</style>
