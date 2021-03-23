<template>
  <div class="tree-container">
    <div class="tree-title">{{ treeData.title }}</div>
    <el-tree :data="treeData.list" :props="defaultProps" default-expand-all @node-click="handleNodeClick" />
    <div class="extend-button" @click="handleExtend" />
  </div>
</template>
<script>
export default {
  props: {
    treeData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      treeOpen: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    // 树形控件
    handleNodeClick(data) {
      console.log(data)
    },

    handleExtend() {
      this.$emit('extend-click')
    }
  }
}
</script>

