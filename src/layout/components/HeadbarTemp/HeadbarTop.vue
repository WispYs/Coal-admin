<template>
  <div class="headbar-top">
    <h1 class="headbar-top__title">合肥院综合信息化平台</h1>
    <div class="headbar-top__right">
      <div class="headbar-top__search">
        <el-input
          v-model="search"
          class="search-input"
          size="mini"
          placeholder="请输入搜索内容"
          suffix-icon="el-icon-search"
        />
        <i class="el-icon-menu" />
      </div>

      <i class="el-icon-bell" />

      <div class="headbar-top__account">
        <img src="@/assets/images/avatar.jpg" class="user_avatar">
        <span class="user-name">用户名</span>
        <icon class="switch-account" icon-class="fa-exchange" />
      </div>

      <div class="headbar-top__setting">
        <i class="el-icon-setting setting-cion" />
        <span>管理</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.headbar-top {
  @include clearfix;
  height: 28px;
  margin: 10px auto;
  line-height: 28px;
  &__title {
    float: left;
    font-size: 18px;
    margin: 0;
  }
  &__right {
    float: right;
    .headbar-top__search {
      display: inline-block;
      margin-right: 20px;
      .search-input {
        width: 250px;
        margin-right: 10px;
      }
    }
    .headbar-top__account {
      @include clearfix;
      display: inline-block;
      margin: 0 20px;
      .user_avatar {
        float: left;
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      .user-name {
        float: left;
        margin: 0 6px;
        font-size: 14px;
      }
      .switch-account {
        font-size: 12px;
      }
    }
    .headbar-top__setting {
      display: inline-block;
      .setting-cion {
        font-size: 13px;
      }
      span {
        font-size: 13px;
      }
    }
  }
}
</style>
