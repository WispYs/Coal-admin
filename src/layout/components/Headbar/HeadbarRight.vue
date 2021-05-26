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
      <el-dropdown-menu slot="dropdown" class="headbar-dropdown__menu" style="height: auto;max-height: 200px;overflow-y: auto">
        <template v-if="extendRoutes && extendRoutes.length > 0">
          <div>
            <el-dropdown-item v-for="item in extendRoutes" :key="item.path">
              <!-- <span v-if="!item.hidden && item.meta && !item.meta.important" :key="item.path">
            {{ item.meta.title }}
          </span> -->
              <item-link :to="item.path">
                <span>{{ item.meta.title }}</span>
              </item-link>

            </el-dropdown-item>
          </div>
        </template>
        <template v-else>
          <p class="headbar-dropdown__empty">暂无数据</p>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="headbar-dropdown" trigger="click">
      <span class="headbar-dropdown__title">
        {{ loginName }}<i class="el-icon-caret-bottom el-icon--right headbar-dropdown__icon" />
      </span>
      <el-dropdown-menu slot="dropdown" class="headbar-dropdown__menu">
        <!-- <el-dropdown-item>个人资料</el-dropdown-item> -->
        <el-dropdown-item @click.native="toggleFullScreen">{{ exitFullscreen ? '退出全屏' : '全屏' }}</el-dropdown-item>
        <el-dropdown-item @click.native="showThemeDialog">更换皮肤</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ItemLink from './Link'

export default {
  components: { ItemLink },
  data() {
    return {
      exitFullscreen: false,
      loginName: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    extendRoutes() {
      return this.permission_routes.filter(item => !item.hidden && item.meta && !item.meta.important)
    }
  },
  created() {
    this.loginName = localStorage.getItem('loginName')
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
    },

    toggleFullScreen() {
      const element = document.documentElement
      if (this.exitFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.exitFullscreen = !this.exitFullscreen
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
    a {
      display: block;
    }
  }
  .headbar-dropdown__empty {
    padding: 0 20px;
    margin: 0;
    text-align: center;
    color: #999;
    font-size: 13px;
  }
}

</style>
