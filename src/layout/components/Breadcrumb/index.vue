<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="!item.redirect && index!==0&&index!==levelList.length - 1 " class="no-redirect">{{ item.meta.title }}</span>
        <span v-else-if="index==levelList.length - 1" class="current">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
    <img v-if="!isCollected" class="collect-menu" src="@/assets/images/star_icon_1.png" alt="" @click="setCollectMenu">
    <img v-else class="collect-menu" src="@/assets/images/star_icon_2.png" alt="" @click="setCollectMenu">

  </el-breadcrumb>

</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null,
      isCollected: false
    }
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
      this.__initCollectMenu()
    }
  },
  created() {
    this.getBreadcrumb()
    this.__initCollectMenu()
  },

  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.levelList = matched
    },
    // 编译path路径
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    // 获取快捷导航，已收藏的菜单在导航栏中显示满星
    __initCollectMenu() {
      const collectMenu = this.$store.state.user.collectMenu
      const isCollectedMenu = collectMenu.filter(it => it.menuId === this.$route.name)
      if (isCollectedMenu && isCollectedMenu.length > 0) {
        this.isCollected = true
      } else {
        this.isCollected = false
      }
    },

    // 设置快捷导航
    setCollectMenu() {
      const routeInfo = {
        menuId: this.$route.name,
        menuResource: JSON.stringify({ title: this.$route.meta.title, path: this.$route.path })
      }
      if (this.isCollected) {
        this.$store.dispatch('user/delCollectMenu', this.$route.name).then(data => {
          console.log(data)
          this.__initCollectMenu()
          this.$message.success('取消收藏')
          // 如果是在门店布局设置页面编辑，刷新当前页面
          if (this.$route.path === '/system-management/portal-manage/portal-layout') {
            this.$router.go(0)
          }
        })
      } else {
        this.$store.dispatch('user/setCollectMenu', routeInfo).then(data => {
          console.log(data)
          this.__initCollectMenu()
          this.$message.success('收藏成功')
          // 如果是在门店布局设置页面编辑，刷新当前页面
          if (this.$route.path === '/system-management/portal-manage/portal-layout') {
            this.$router.go(0)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 45px;
  height: 45px;
  overflow: hidden;
  width: 100%;
  background: #fff;
  padding-left: 20px;
  a {
    color: #97a8be;
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .current {
    @include primaryColor($primaryColor);
  }
  .collect-menu {
    display: inline-block;
    margin-left: 10px;
    margin-top: -2px;
    cursor: pointer;
  }
  &:hover {
    .collect-menu {
      display: inline-block;
    }
  }
}

</style>
