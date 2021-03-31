<template>
  <div class="tree-container">
    <div v-if="!treeData.title2" class="tree-title-file">{{ treeData.title }}</div>
    <el-tabs class="t_titles" v-model="activeName" v-else-if="!!treeData.title2" @tab-click="handleClick">
      <el-tab-pane label="文件夹" name="file">文件夹</el-tab-pane>
      <el-tab-pane label="部门" name="dept">部门</el-tab-pane>
    </el-tabs>

    <!-- <div class="tree-title-file">{{ treeData.title }}</div> -->
    <el-input class="treeInpt" v-if="treeData.search" v-model="nodeContent" placeholder="请输入内容" prefix-icon="el-icon-search" />
    <el-tree class="trees" :title="treeData.list" :show-checkbox="treeData.checkbox" :data="treeData.list" :props="defaultProps"
      default-expand-all @node-click="handleNodeClick">
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
        nodeContent: '',
        activeName: 'file',
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
      },
      handleSelect(key, keyPath) {
        this.activeIndex = key;
      },
      // 点击文件夹或者部门触发
      handleClick(tab, event) {
        console.log(tab, event);
        // this.$emit("handleClick",tab,event)
      }
    }
  }
</script>
<style lang="scss">
  .tree-container{
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
        width: 160px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .treeInpt {
      height: 36px;
      line-height: 36px;
      margin-bottom: 8px;
    }

    .t_titles{
      margin-bottom: 16px;
    }

    #tab-file,#tab-dept{
      width: 68px;
      padding: 0;
      text-align: center;
    }

    #pane-file,#pane-dept{
      text-indent: 0.8em;
    }
  }
</style>
