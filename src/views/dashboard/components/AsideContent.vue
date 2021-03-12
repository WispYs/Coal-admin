<template>
  <div class="content aside-content">
    <div class="aside-content__box">
      <div class="content-title">
        <span>待办任务</span>
        <div class="right-btn">更多</div>
      </div>
      <div class="content-box">
        <div v-for="item in Backlog" :key="item.name" class="backlog-list">
          <p>{{ item.name }}</p>
          <span :class="item.status ? 'active' : ''">{{ item.status ? '待办' : '已办' }}</span>
        </div>
        <!-- <div class="backlog-list">
          <p>待办任务1</p>
          <span class="active">待办</span>
        </div>
        <div class="backlog-list">
          <p>待办任务1</p>
          <span>已办</span>
        </div>
        <div class="backlog-list">
          <p>待办任务1</p>
          <span>已办</span>
        </div> -->
      </div>
    </div>
    <div class="aside-content__box">
      <div class="content-title">
        <span>公文新闻</span>
        <div class="right-btn">更多</div>
      </div>
      <div class="content-box">
        <div v-for="item in newsList" :key="item.title" class="news-list">
          <img src="@/assets/images/news.jpg" :alt="item.title">
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>
    <div class="aside-content__box">
      <div class="content-title">
        <span>快捷功能</span>
        <div class="right-btn"><i class="el-icon-delete" />删除</div>
        <div class="right-btn"><i class="el-icon-plus" />添加</div>
      </div>
      <div class="content-box">
        <div v-for="item in QuickFunction" :key="item.name" class="quick-function-list">
          <div class="quick-icon"><i :class="item.icon" /></div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { QuickFunction, Backlog, newsList } from '@/data/dashboard'
export default {
  data() {
    return {
      regionList: [],
      region: '',
      QuickFunction,
      Backlog,
      newsList
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/dashboard.scss';
.aside-content {
  height: 850px !important;
  &__box {
    .content-title {
      margin-bottom: 5px
    }
    margin-bottom: 15px;
  }
  .backlog-list {
    line-height: 20px;
    font-size: 13px;
    overflow: hidden;
    margin-bottom: 15px;
    p {
      float: left;
    }
    span {
      float: right;
      color: $grayColor;
      width: 40px;
      height: 20px;
      text-align: center;
      &.active {
        @include primaryColor($primaryColor);
        @include primaryBorder($primaryColor);

        border: 1px solid;
      }
    }
  }
  .news-list {
    overflow: hidden;
    cursor: pointer;
    padding: 10px 0;
    border-bottom:1px solid #eeeeee ;
    &:hover {
      @include sideMenuActiveBg($dropdownBg, $dropdownColor)
    }
    &:last-of-type {
      border-bottom: 0;
    }
    img {
      float: left;
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    p {
      float: left;
      font-size: 13px;
      line-height: 20px;
      height: 40px;
      width: calc(100% - 50px);
      overflow : hidden;
      color: $lightBlackColor;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .quick-function-list {
    overflow: hidden;
    cursor: pointer;
    padding: 10px 0;
    &:hover {
      @include sideMenuActiveBg($dropdownBg, $dropdownColor)
    }
    .quick-icon {
      @include primaryBg($primaryColor);
      float: left;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        color: #fff;
        font-size: 20px;
      }
    }
    p {
      float: left;
      color: $lightBlackColor;
      font-size: 13px;
      line-height: 30px;
      width: calc(100% - 40px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
