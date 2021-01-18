<template>
  <div class="menu-container clearfix">
    <div v-for="item in routes" :key="item.path" style="display: inline-block">
      <div v-if="!item.hidden && item.meta" class="menu-first--wrapper">
        <!-- 一级菜单 -->
        <menu-tier :class-name="'item-first'" :children="item.children" :hidden-child="item.meta.hiddenChild" :title="item.meta.title" :path="item.path" />
        <div v-if="showChildrenRoute(item.children, item.meta.hiddenChild)" class="menu-second--wrapper">
          <div v-for="it in item.children" :key="it.path" :class="showChildrenRoute(it.children, it.meta.hiddenChild) ? 'menu-second clearfix' : 'menu-second--nochild clearfix' ">
            <!-- 二级菜单 -->
            <menu-tier :class-name="'menu-second__title'" :children="it.children" :hidden-child="it.meta.hiddenChild" :title="it.meta.title" :path="it.path" />
            <div v-if="showChildrenRoute(it.children, it.meta.hiddenChild)" class="menu-third--wrapper">
              <div v-for="i in it.children" :key="i.path" class="menu-third" @mouseover.prevent="showFourth($event)" @mouseout.prevent="hideFourth($event)">
                <!-- 三级菜单 -->
                <menu-tier :class-name="'menu-third__title'" :children="i.children" :hidden-child="i.meta.hiddenChild" :title="i.meta.title" :path="i.path" />
                <div v-if="showChildrenRoute(i.children, i.meta.hiddenChild)" class="menu-fourth--wrapper">
                  <div v-for="j in i.children" :key="j.path" class="menu-fourth">
                    <!-- 四级菜单 -->
                    <menu-tier :class-name="'menu-fourth__title'" :children="j.children" :hidden-child="j.meta.hiddenChild" :title="j.meta.title" :path="j.path" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTier from './MenuTier'

export default {
  name: 'MenuWrap',
  components: { MenuTier },
  props: {
    routes: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {}
  },
  methods: {
    // 解决四级菜单定位问题
    showFourth(e) {
      const target = e.currentTarget
      const offsetTop = target.offsetTop
      target.childNodes.forEach(item => {
        if (item.className === 'menu-fourth--wrapper') {
          item.style.display = 'block'
          item.style.top = 40 + offsetTop + 'px'
        }
      })
    },
    // 有子菜单并且不隐藏子菜单，则不添加跳转链接
    showChildrenRoute(children, hiddenChild) {
      return children && children.length > 0 && !hiddenChild
    },
    hideFourth(e) {
      const target = e.currentTarget
      target.childNodes.forEach(item => {
        if (item.className === 'menu-fourth--wrapper') {
          item.style.display = 'none'
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '~@/assets/styles/variables.scss';
.menu-first--wrapper {
  .router-link-active {
    span {
      color: $menuActiveText;
    }
  }
}

</style>
