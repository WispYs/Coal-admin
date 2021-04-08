<template>
  <div class="tree-container">
    <div v-if="!treeData.title2" class="tree-title-file">{{ treeData.title }}</div>
    <el-tabs v-else-if="!!treeData.title2" v-model="activeName" class="t_titles" @tab-click="handleClick">
      <el-tab-pane label="文件夹" name="file">文件夹</el-tab-pane>
      <el-tab-pane label="部门" name="dept">部门</el-tab-pane>
    </el-tabs>

    <!-- <div class="tree-title-file">{{ treeData.title }}</div> -->
    <el-input v-if="treeData.search" v-model="nodeContent" class="treeInpt" placeholder="请输入内容" prefix-icon="el-icon-search" @change="searchSite" />
    <el-tree
      class="trees"
      :title="treeData.list"
      :show-checkbox="treeData.checkbox"
      :data="treeData.list"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      @check-change="checkChange"
    >
      <span slot-scope="{ node, data }" class="span-ellipsis" @contextmenu.prevent="openMenu(node, $event)">
        <span :title="node.label">{{ node.label }}</span>
      </span>
    </el-tree>
    <!-- <div v-if="treeData.arrow" class="extend" @click="handleExtend"><i class="el-icon-d-arrow-left" /></div>
    <div v-else class="extend-button" @click="handleExtend" /> -->

    <ul
      v-if="hasMenu"
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="create">新建</li>
      <li v-if="tag && tag.data.value > 0" @click="edit">编辑</li>
      <li v-if="tag && tag.data.value > 0" @click="del">删除</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    treeData: {
      type: Object,
      default: () => {}
    },
    hasMenu: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      treeOpen: true,
      sysMenuIds: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nodeContent: '',
      activeName: 'file',
      tag: null
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    // 树形控件
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
      this.closeMenu()
    },
    handleExtend() {
      this.$emit('extend-click')
    },
    // 点击文件夹或者部门触发
    handleClick(tab, event) {
      // console.log('tab-switch', tab.index)
      this.$emit('handleSwitch', tab)
      // this.$emit("handleClick",tab,event)
    },
    checkChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
      if (checked) {
        this.sysMenuIds.push(data.value)
      } else {
        for (const s in this.sysMenuIds) {
          if (data.value === this.sysMenuIds[s]) {
            this.sysMenuIds.splice(s, 1)
          }
        }
      }
      this.$emit('checkChange', this.sysMenuIds)
      // console.log(this.sysMenuIds);
    },
    searchSite(_val) {
      this.$emit('searchSite', _val)
    },
    openMenu(tag, e) {
      console.log('tag', tag)
      this.tag = tag
      const menuMinWidth = 60
      const rect = this.$el.getBoundingClientRect()
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth
      const left = e.clientX - rect.left
      const top = e.clientY - rect.top

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = top // tagsView height
      this.visible = true
    },
    closeMenu() {
      this.visible = false
      this.fId = ''
    },
    create() {
      this.$emit('createFolder', this.tag)
      this.closeMenu()
    },
    edit() {
      this.$emit('editFolder', this.tag)
      this.closeMenu()
    },
    del() {
      this.$emit('delFolder', this.tag)
      this.closeMenu()
    }
  }
}
</script>
<style lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
  .tree-container{
    .contextmenu {
      margin: 0;
      background: $whiteColor;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: $lightBlackColor;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
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

    .el-tabs__item.is-active,
    .el-tabs__item:hover {
      color: $blueColor;
    }

    .el-tabs__active-bar {
      background-color:$blueColor;
    }
  }
  .extend{
    position: absolute;
    top: 4.5%;
    right: -40px;
    cursor: pointer;
    // -ms-transform:rotate(-90deg); /* Internet Explorer 9*/
    // -moz-transform:rotate(-90deg); /* Firefox */
    // -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
    // -o-transform:rotate(-90deg); /* Opera */
    // filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
  }
</style>
