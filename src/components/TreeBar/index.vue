<template>
  <div class="tree-container">
    <div class="tree-title">{{ treeData.title }}</div>
    <el-input v-if="treeData.search" v-model="nodeContent" placeholder="请输入内容" prefix-icon="el-icon-search" />
    <el-tree class="trees" :title="treeData.list" :show-checkbox="treeData.checkbox" :data="treeData.list" :props="defaultProps" default-expand-all @node-click="handleNodeClick">
      <span slot-scope="{ node, data }" class="span-ellipsis">
        <span :title="node.label">{{ node.label }}</span>
      </span>
    </el-tree>
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
      },
      nodeContent: ''
    }
  },
  methods: {
    // 树形控件
    handleNodeClick(data) {
      console.log(data)
      this.$emit('handleNodeClick', data)
    },

    handleExtend() {
      this.$emit('extend-click')
    }
  }
}
</script>
<style lang="scss">
  .trees {
    .el-tree-node {
      .el-tree-node__content {
        .el-tree-node__label {
          width: 160px;
        }
      }
    }
    .span-ellipsis {
      font-size: 13px;
      width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
