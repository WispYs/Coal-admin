<template>
  <div class="headbar-right">
    <div class="icon-content">
      <icon icon-class="fa-volume-up" class="headbar-right__icon" />
      <span class="icon-tag">4</span>
    </div>
    <div class="icon-content">
      <i class="el-icon-bell headbar-right__icon" />
      <span class="icon-tag">12</span>
    </div>
    <el-dropdown class="headbar-dropdown" trigger="click">
      <span class="headbar-dropdown__title">
        更多菜单<i class="el-icon-caret-bottom el-icon--right headbar-dropdown__icon" />
      </span>
      <el-dropdown-menu slot="dropdown" class="headbar-dropdown__menu">
        <el-dropdown-item>菜单标题</el-dropdown-item>
        <el-dropdown-item>菜单标题</el-dropdown-item>
        <el-dropdown-item>菜单标题</el-dropdown-item>
        <el-dropdown-item>菜单标题</el-dropdown-item>
        <el-dropdown-item>菜单标题</el-dropdown-item>
        <el-dropdown-item>菜单标题</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="headbar-dropdown" trigger="click">
      <span class="headbar-dropdown__title">
        admin<i class="el-icon-caret-bottom el-icon--right headbar-dropdown__icon" />
      </span>
      <el-dropdown-menu slot="dropdown" class="headbar-dropdown__menu">
        <el-dropdown-item>个人资料</el-dropdown-item>
        <el-dropdown-item @click.native="showThemeDialog">更换皮肤</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    // 主题色弹窗
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
.headbar-right {
  float: right;
  // width: 250px;
  height: $headBarHeight;
  color: #fff;
  &__icon {
    float: left;
    font-size: 20px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }
  .icon-content {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin-top: calc((#{$headBarHeight} - 20px)/2);
    margin-right: 30px;
    overflow: hidden;
    .icon-tag {
      float: left;
      width: 20px;
      height: 20px;
      color: #fff;
      background: #FF5722;
      margin-left: 5px;
      font-size: 12px;
      text-align: center;
      border-radius: 2px;
    }
  }
  .headbar-dropdown {
    float: right;
    margin-left: 10px;
    line-height: $headBarHeight;
    height: $headBarHeight;
    color: #fff;
    &__title {
      font-size: 13px;
      cursor: pointer;
    }
    &__icon {
      font-size: 12px;
    }
  }
}
</style>
<style lang="scss">
.headbar-dropdown__menu {
  .el-dropdown-menu__item {
    font-size: 13px;
  }
}

</style>
