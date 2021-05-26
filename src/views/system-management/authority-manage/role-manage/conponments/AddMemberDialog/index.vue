<template>
  <el-dialog
    :title="config.title"
    :visible.sync="dialogVisible"
    :width="config.width || '500px'"
    :before-close="closeDialog"
  >
    <div class="add-content">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <el-input v-model="keyword" class="search_organ" prefix-icon="el-icon-search" placeholder="请输入关键字" @change="keywordSearch" />
        </el-col>
        <el-col :span="12" class="memberSearch">
          <div class="search_filter">
            <filter-bar :config="memberFilterConfig" @search-click="contentSearch" />
          </div>
        </el-col>
        <el-col :span="6" class="slect_user">
          <h3>已选中用户</h3>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <tree-bar class="grid-content" :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
        </el-col>
        <el-col :span="12">
          <div class="bg-purple-light">
            <list-table
              :id="id"
              :list="roleUserInfo.roleUserList"
              :list-loading="listLoading"
              :config="roleUserInfo.memberConfig"
              height="314px"
              @selection-change="selectionChange"
            />
            <pagination
              v-show="roleUserInfo.total>0"
              :layout="this.layout"
              :total="roleUserInfo.total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.pagerows"
              @pagination="updataPage"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="selectMember">
            <div v-if="selectMember.length > 0">
              <div v-for="(item,index) in selectMember" :key="index" class="selectItem">
                <span>{{ item.loginName }}</span>
              </div>
            </div>
            <span v-else class="nullData">暂无数据</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="AddMember">确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getUserList, addRoleUser, getOrganTree } from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import TreeBar from '@/components/TreeBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import {
  memberFilterConfig
} from '@/data/authority-management'
export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    TreeBar
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹窗配置项
    config: {
      type: Object,
      default: () => ({})
    },
    selectRole: {
      type: Object,
      default: () => ({})
    },
    roleUserInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentPage1: 5,
      id: 'addMember',
      formData: {}, // 弹窗表单
      keyword: '',
      content: '',
      selectMember: [],
      list: [],
      treeData: {
        title: '',
        list: []
      },
      memberFilterConfig,
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      sysDeptId: '',
      layout: 'total, prev, pager, next'
    }
  },
  created() {
    this.total = this.roleUserInfo.total
    // 获取左侧部门树
    this.getTree()
  },
  methods: {
    // 分页触发
    updataPage(_data) {
      console.log(_data)
      this.$emit('updataPage', _data, 2)
    },
    closeDialog() {
      this.keyword = ''
      this.content = ''
      this.sysDeptId = ''
      this.$emit('closeDialog')
    },
    // 关键字搜索
    keywordSearch(val) {
      if (val) {
        for (const _t in this.treeData.list) {
          this.getDeptId(this.treeData.list[_t], val)
        }
      }
      this.getTree(this.sysDeptId)
    },
    getDeptId(_data, val) {
      if (_data.label.indexOf(val) != -1) {
        this.sysDeptId = _data.value
        return false
      }
      if (_data.children) {
        for (const _t in _data.children) {
          this.getDeptId(_data.children[_t], val)
        }
      }
    },
    getTree(val) {
      const sysDeptId = val
      getOrganTree(sysDeptId).then(response => {
        this.treeData.list = response.data
        this.sysDeptId = ''
      })
    },
    // 工号、姓名、登录名搜索
    contentSearch(data) {
      this.$emit('contentSearch', data.keyword)
    },
    selectionChange(row) {
      this.selectMember = row
    },
    handleNodeClick(data) {
      this.$emit('treeClick', data)
      console.log(data)
    },
    // 点击添加角色用户
    AddMember() {
      const sysUserIds = []
      for (const _s of this.selectMember) {
        sysUserIds.push(_s.sysUserId)
      }
      const query = {
        sysRoleId: this.selectRole.sysRoleId,
        sysUserIds: sysUserIds
      }
      addRoleUser(query).then(response => {
        this.$emit('closeDialog', this.listQuery)
      })
    }
  }
}
</script>
<style lang="scss">
  .grid-content {
    .el-tree{
      height: 380px;
      overflow: auto;
    }
  }
  .search_organ{
    .el-input__inner{
      height: 36px;
    }
  }
</style>
<style lang="scss" scoped>
  .add-content{
    width: calc(100% - 40px);
    margin: 20px auto 0;
    .row-bg{
      .memberSearch{
        .search_filter{
          float: right;
          .filter-bar{
            margin-bottom: 0;
            margin-right: -40px;
          }
        }
      }
      .slect_user{
        h3{
          height: 36px;
          line-height: 36px;
          margin-left: 40px;
        }
      }
      .grid-content{
        border-right: 2px solid #ccc;
      }
      .bg-purple-light {
        height: 380px;
        padding-right: 2px;
        border-right: 2px solid #ccc;

        .el-table {
          width: calc(100% - 14px);
          margin-left: 14px;
        }
        .pagination-container{
          padding: 18px 0 6px;
        }
      }
      .selectMember{
        text-indent: 2em;
        .selectItem{
          margin-bottom: 2px;
        }
        .nullData{
          display: inline-block;
        }
      }
    }
  }
</style>
