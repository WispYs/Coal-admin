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
        <i class="el-icon-menu headbar-icon" />
      </div>
      <el-badge :is-dot="isWarning" class="bell-badge" @click="showWarning">
        <i class="el-icon-bell headbar-icon" />
        <div class="warning-content">
          <div class="warning-list">
            <i class="el-icon-warning" />
            <p>预警信息内容，内容可展示为两行文字提示，可同时出现多条提示。</p>
          </div>
          <div class="warning-list">
            <i class="el-icon-warning" />
            <p>预警信息内容，内容可展示为两行文字提示，可同时出现多条提示。</p>
          </div>
        </div>
      </el-badge>
      <el-dropdown class="account-wrapper" trigger="click">
        <!-- <div class="avatar-content">
          <img src="@/assets/images/avatar.jpg" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div> -->
        <div class="headbar-top__account">
          <img src="@/assets/images/avatar.jpg" class="user_avatar">
          <span class="user-name">用户名</span>
          <icon class="switch-account" icon-class="fa-exchange" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item @click.native="showThemeDialog">更换皮肤</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

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
      search: '',
      isWarning: true
    }
  },
  methods: {
    showWarning() {

    },
    showThemeDialog() {
      this.$emit('showThemeDialog')
    },
    logout() {
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/variables.scss';
.headbar-top {
  @include clearfix;
  height: 28px;
  margin: 15px auto 2px;
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
    .headbar-icon {
      font-size: 16px;
      cursor: pointer;
    }
    .bell-badge {
      position: relative;
      // &:hover {
      //   .warning-content {
      //     display: block;
      //   }
      // }
      .warning-content {
        display: none;
        position: absolute;
        top: 140%;
        left: 50%;
        width: 300px;
        height: 120px;
        padding: 12px;
        transform: translateX(-80%);
        z-index: 2000;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        color: #606266;
        line-height: 1.4;
        text-align: justify;
        font-size: 14px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        word-break: break-all;
        &::after {
          content: '';
          position: absolute;
          top: -8px;
          right: calc(20% - 16px);
          width: 0;
          height: 0;
          border-bottom: 8px solid #fff;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
        }
        &.active {
          display: block;
        }

        .warning-list {
          @include clearfix;
          border-bottom: 1px solid $borderColor;
          padding: 10px 0;
          i {
            float: left;
            margin-right: 10px;
            margin-top: 2px;
            font-size: 16px;
          }
          i.tip {
            color: $grayColor;
          }
          i.warn {
            color: $redColor;
          }
          p {
            font-size: 12px;
            margin-left: 26px;
          }
        }
      }
    }

    .headbar-top__account {
      @include clearfix;
      display: inline-block;
      margin: 0 30px;
      color: $whiteColor;
      cursor: pointer;
      .user_avatar {
        float: left;
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      .user-name {
        float: left;
        margin: 0 6px;
        font-size: 13px;
      }
      .switch-account {
        font-size: 12px;
      }
    }
    .headbar-top__setting {
      display: inline-block;
      cursor: pointer;
      .setting-cion {
        font-size: 13px;
      }
      span {
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
}
</style>
<style lang="scss">
.bell-badge {
  .el-badge__content.is-fixed.is-dot {
    right: 7px;
    top: 8px;
    width: 7px;
    height: 7px;
  }
}
</style>
