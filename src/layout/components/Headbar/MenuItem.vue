<template>
  <div v-if="!item.hidden && item.meta" class="nav-item">
    <div class="nav-item__title">
      <!-- 一级菜单 -->
      <app-link :to="item.path">
        <span>{{ item.meta.title }}</span>
      </app-link>
      <div v-if="item.children && item.children.length > 0 && !item.meta.hiddenChild" class="item-extend">
        <div v-for="it in item.children" :key="it.path" class="extend-second clearfix">
          <!-- 二级菜单 -->
          <app-link :to="it.path">
            <span class="extend-second__title">{{ it.meta.title }}></span>
          </app-link>
          <template v-if="it.children && it.children.length > 0">
            <div class="extend-third--wrapper">
              <div v-for="i in it.children" :key="i.path" class="extend-third" @mouseover.prevent="showFourth($event)" @mouseout.prevent="hideFourth($event)">
                <!-- 三级菜单 -->
                <app-link :to="i.path">
                  <span class="extend-third__title">
                    {{ i.meta.title }}
                    <icon v-if="i.children && i.children.length > 0" icon-class="fa-angle-down" class="third-icon" />
                  </span>
                </app-link>
                <div v-if="i.children && i.children.length > 0" class="extend-fourth--wrapper">
                  <div v-for="j in i.children" :key="j.path" class="extend-fourth">
                    <!-- 四级菜单 -->
                    <app-link :to="j.path">
                      <span>{{ j.meta.title }}</span>
                    </app-link>
                  </div>
                </div>
              </div>
            </div>

          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLink from './Link'

export default {
  name: 'MenuItem',
  components: { AppLink },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
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
        if (item.className === 'extend-fourth--wrapper') {
          item.style.display = 'block'
          item.style.top = 40 + offsetTop + 'px'
        }
      })
    },
    hideFourth(e) {
      const target = e.currentTarget
      target.childNodes.forEach(item => {
        if (item.className === 'extend-fourth--wrapper') {
          item.style.display = 'none'
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '~@/assets/styles/variables.scss';
.nav-item {
  .router-link-active {
    span {
      color: $menuActiveText;
    }
  }
}

</style>
