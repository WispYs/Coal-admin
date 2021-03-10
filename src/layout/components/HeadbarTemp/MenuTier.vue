<template>
  <div>
    <span v-if="showChildrenRoute(children, hiddenChild)" :class="className">
      {{ title }}
      <icon icon-class="fa-angle-down" class="third-icon" />
    </span>
    <item-link v-else :to="path">
      <span :class="className">{{ title }}</span>
    </item-link>
  </div>
</template>
<script>
import ItemLink from './Link'

export default {
  name: 'MenuTier', // 菜单层级组件
  components: { ItemLink },
  props: {
    className: {
      type: String,
      default: ''
    },
    children: {
      type: Array,
      default: () => ([])
    },
    hiddenChild: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 有子菜单并且不隐藏子菜单，则不添加跳转链接
    showChildrenRoute(children, hiddenChild) {
      return children && children.length > 0 && !hiddenChild
    }
  }

}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
