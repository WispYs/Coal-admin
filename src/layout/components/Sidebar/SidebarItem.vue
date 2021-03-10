<template>
  <div v-if="!item.hidden">
    <template v-if="!hasShowChild(item.children)">
      <app-link v-if="item.meta" :to="item.path">
        <el-menu-item :index="item.path">
          <!-- <el-tooltip :content="item.meta.title" placement="top-start"> -->
          <span>{{ item.meta.title }}</span>
          <!-- </el-tooltip> -->
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template slot="title">
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { AppLink },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {

    hasShowChild(children = []) {
      const showChildren = children.filter(item => !item.hidden)
      if (showChildren.length > 0) {
        return true
      }
      return false
    }

  }
}
</script>
