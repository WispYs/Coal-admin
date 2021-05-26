<template>
  <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'" :before-close="closeDialog">
    <div class="add-content">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <el-input v-model="keyword" class="search_organ" prefix-icon="el-icon-search" placeholder="请输入关键字" @change="keywordSearch" />
        </el-col>
        <el-col :span="12" class="memberSearch">
          <div class="search_filter">
            <filter-bar :config="config.filter" @search-click="contentSearch" />
          </div>
        </el-col>
        <el-col :span="6" class="slect_user">
          <h3>已选中用户</h3>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <tree-bar
            class="grid-content"
            :tree-data="treeData"
            @extend-click="treeExtend = !treeExtend"
            @handleNodeClick="handleNodeClick"
          />
        </el-col>
        <el-col :span="12">
          <div class="bg-purple-light">
            <list-table
              :id="id"
              ref="userList"
              :list="list"
              :list-loading="listLoading"
              :config="config.form"
              height="314px"
              @selection-change="selectionChange"
            />
            <pagination
              v-show="total>0"
              :layout="layout"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.pagerows"
              @pagination="updataPage"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="selectMember">
            <div v-if="selectMember && selectMember.length > 0">
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
      <el-button type="primary" @click="AddMember">提 交</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  getRoleUserList,
  getOrganTree
} from '@/api/authority-management'
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
    }
  },
  data() {
    return {
      id: 'addMember',
      formData: {}, // 弹窗表单
      keyword: '',
      selectMember: [],
      list: [],
      treeData: {
        title: '',
        list: []
      },
      filter: {},
      memberFilterConfig,
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      sysDeptId: '',
      deptIds: [],
      layout: 'total, prev, pager, next',
      selectUserData: [] // 选中项
    }
  },
  created() {
    // this.keywordSearch()
  },
  methods: {
    // 获取角色下的所有用户列表
    fetchUserList() {
      const query = {
        entity: {
          sysDeptId: this.filter.organizationId
        },
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.keyword,
        keywordField: ['userName', 'loginName']
      }
      getRoleUserList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.records)
        } else {
          this.listLoading = false
          this.list = []
          this.total = 0
        }
      }).catch(err => {
        console.log(err)
        this.listLoading = false
      })
    },
    // 异步获取用户列表
    asyncUserList() {
      const query = {
        entity: {
          sysDeptId: this.filter.organizationId
        },
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.keyword,
        keywordField: ['userName', 'loginName']
      }
      return new Promise((resolve, reject) => {
        getRoleUserList(query).then(response => {
          if (response.data.rows.length > 0) {
            this.listLoading = false
            this.list = response.data.rows
            this.total = Number(response.data.records)
            resolve(response.data.rows)
          } else {
            this.listLoading = false
            this.list = []
            this.total = 0
            resolve([])
          }
        }).catch(err => {
          reject(err)
          this.listLoading = false
        })
      })
    },
    // 分页触发
    async updataPage(_data) {
      await this.asyncUserList()
      this.toggleSelection(this.selectUserData)
    },
    closeDialog() {
      this.keyword = ''
      this.$emit('closeDialog')
    },
    // 关键字搜索
    keywordSearch(val) {
      this.sysDeptId = ''
      this.deptIds = []
      if (val) {
        for (const _t in this.treeData.list) {
          this.getDeptId(this.treeData.list[_t], val)
        }
        // this.sysDeptId = this.deptIds.join()
        this.sysDeptId = this.deptIds[0]
      } else {
        this.filter.organizationId = ''
        this.fetchUserList()
      }
      this.getTree(this.sysDeptId)
    },
    getDeptId(_data, val) {
      if (_data.label.indexOf(val) != -1) {
        this.deptIds.push(_data.value)
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
        this.config.form.columns.forEach(it => {
          if (it.field == 'sysDeptId') {
            it.options = response.data
          }
        })
        this.treeData.list = response.data
        this.sysDeptId = ''
      })
    },
    // 工号、姓名、登录名搜索
    contentSearch(data) {
      this.filter = Object.assign(this.filter, data)
      this.fetchUserList()
    },
    selectionChange(row) {
      this.selectMember = row
    },
    // 回显选中项
    toggleSelection(userData) {
      // 存储选中项数据，用于分页查询
      this.selectUserData = userData
      // 设置右侧已选中用户列表
      if (userData) {
        this.selectMember = userData
      } else {
        this.selectMember = []
      }
      this.matchListData(userData)
    },
    // 匹配选中项
    matchListData(userData) {
      // 显示 loginName 登录名匹配相同
      const selectedUser = this.list.filter(list => userData.some(user => list.sysUserId === user.sysUserId))

      this.$nextTick(() => {
        // 设置选中项
        this.$refs.userList.setSelected(selectedUser)
      })
    },
    handleNodeClick(data) {
      this.filter = Object.assign(this.filter, {
        organizationId: data.value
      })
      this.fetchUserList()
    },
    // 点击添加角色用户
    AddMember() {
      const userNames = []
      const userIds = []

      for (const _s of this.selectMember) {
        userNames.push(_s.loginName)
        userIds.push(_s.sysUserId)
      }
      this.$emit('add-personne', userNames, userIds)
    }
  }
}
</script>
<style lang="scss">
  .grid-content {
    .el-tree {
      height: 380px;
      overflow: auto;
    }
  }

  .search_organ {
    .el-input__inner {
      height: 36px;
    }
  }
</style>
<style lang="scss" scoped>
  .add-content {
    width: calc(100% - 40px);
    margin: 20px auto 0;

    .row-bg {
      .memberSearch {
        .search_filter {
          float: right;

          .filter-bar {
            margin-bottom: 0;
            margin-right: -40px;
          }
        }
      }

      .slect_user {
        h3 {
          height: 36px;
          line-height: 36px;
          margin-left: 40px;
        }
      }

      .grid-content {
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

        .pagination-container {
          padding: 18px 0 6px;
        }
      }

      .selectMember {
        text-indent: 2em;

        .selectItem {
          margin-bottom: 2px;
        }

        .nullData {
          display: inline-block;
        }
      }
    }
  }
</style>
