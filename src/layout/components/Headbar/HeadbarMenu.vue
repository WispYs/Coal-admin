<template>
  <div class="headbar-menu">
    <template v-for="(item,index) in routes">
      <div v-if="!item.hidden && item.meta && item.meta.important" :key="item.path" class="headbar-menu__item">
        <headbar-menu-item :title="item.meta.title" :path="item.path" :index="index" />
      </div>
    </template>
    <div class="expand-menu">
      <i class="el-icon-menu expand-menu__icon" @click="expandMenuVisible = !expandMenuVisible" />
      <div class="expand-menu__content" :class="expandMenuVisible ? 'active' : ''">
        <template v-for="item in routes">
          <div v-if="!item.hidden && item.meta && !item.meta.important" :key="item.path" class="expand-menu__item">
            <item-link :to="item.path">
              <el-button size="small">{{ item.meta.title }}</el-button>
            </item-link>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>
<script>
import HeadbarMenuItem from './HeadbarMenuItem'
import ItemLink from './Link'
export default {
  components: { HeadbarMenuItem, ItemLink },
  props: {
    routes: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      expandMenuVisible: false
    }
  },
  watch: {
    expandMenuVisible(value) {
      if (value) {
        this.showExpandMenu()
      }
    }
  },
  methods: {
    showExpandMenu() {
      window.addEventListener('click', this.closeExpandMenu)
    },
    closeExpandMenu(event) {
      const parent = event.target.closest('.expand-menu')
      const parentItem = event.target.closest('.expand-menu__item')
      if (!parent || parentItem) {
        this.expandMenuVisible = false
        window.removeEventListener('click', this.closeExpandMenu)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixin.scss';
.headbar-menu {
  position: relative;
  height: 50px;
  line-height: 50px;
  padding-right: 100px;
  display: flex;
  justify-content: space-between;
  &__item {
    &:hover {
      @include primaryColor($primaryColor);
    }
    &.active {
      @include primaryColor($primaryColor);
    }
  }
  .expand-menu {
    &__icon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      cursor: pointer;
    }
    &__content {
      display: none;
      position: absolute;
      top: 100%;
      right: -20px;
      width: 480px;
      height: auto;
      padding: 10px;
      background: #fff;
      border: 1px solid $borderColor;
      &.active {
        display: block;
      }
    }
    &__item {
      float: left;
      color:#333;
      font-size: 13px;
      line-height: 28px;
      margin: 5px;
    }
  }
}
</style>
