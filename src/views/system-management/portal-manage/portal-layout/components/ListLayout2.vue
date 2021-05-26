<template>
  <div class="swiper-content">
    <div class="list-data2-content">
      <div v-for="(it,index) in ListData" :key="index" class="list-data2-content__item">
        <img :src="require(`@/assets/images/list_data_icon_${Math.ceil((index+1)/3+1)}.png`)" alt="">
        <div class="item-info">
          <p>{{ it.title }}</p>
          <span>{{ it.describe }}</span>
        </div>
        <div class="item-btn">查看</div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ListData: {}
    }
  },
  mounted() {
    this.ListData = [
      {
        title: '公文公告',
        describe: '为了促进公司各部门间的交流，培育高新技术产业新人才，公司将于1210年13月32日开始...'
      },
      {
        title: '公文公告',
        describe: '为了促进公司各部门间的交流，培育高新技术产业新人才，公司将于1210年13月32日开始...'
      },
      {
        title: '公文公告',
        describe: '为了促进公司各部门间的交流，培育高新技术产业新人才，公司将于1210年13月32日开始...'
      },
      {
        title: '公文公告',
        describe: '为了促进公司各部门间的交流，培育高新技术产业新人才，公司将于1210年13月32日开始...'
      },
      {
        title: '公文公告',
        describe: '为了促进公司各部门间的交流，培育高新技术产业新人才，公司将于1210年13月32日开始...'
      },
      {
        title: '公文公告',
        describe: '为了促进公司各部门间的交流，培育高新技术产业新人才，公司将于1210年13月32日开始...'
      }
    ]
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/mixin.scss';

.list-data2-content {
  padding: 40px 20px 0;
  overflow: hidden;
  &__item {
    @include clearfix;
    position: relative;
    padding: 10px 15px;
    height: 60px;
    background: #f9f9f9;
    margin-top: 14px;
    border-radius: 8px;
    img {
      float: left;
      width: 34px;
      height: 34px;
      margin-right: 10px;
      margin-top: 3px;
    }
    .item-info {
      float: left;
      width: calc(100% - 114px);
      margin-top: 2px;
      p {
        font-size: 14px;
        font-weight: bold;
        color: #000;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      span {
        display: block;
        font-size: 12px;
        color: #999;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .item-btn {
      float: right;
      padding: 0 18px;
      line-height: 26px;
      font-size: 13px;
      font-weight: bold;
      margin-top: 6px;
      text-align: center;
      border: 1px solid #0387fe;
      color: #0387fe;
      border-radius: 40px;
      cursor: pointer;
    }
  }

}

</style>
