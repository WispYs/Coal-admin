<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @handleNodeClick="handleNodeClick" />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="PortalUserFilterConfig"
        @search-click="queryData"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="PortalUserTableConfig"
        height="calc(100% - 157px)"
        @other-click="openResourceAllot"
      />

      <div v-show="total>0" class="page-bottom">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="__fetchData"
        />
      </div>

      <!-- 资源配置 -->
      <resource-allot
        ref="resourceAllot"
        :dialog-visible="resourceAllotVisible"
        @close-dialog="resourceAllotVisible = false"
        @submit="allotResource"
      />
    </div>

  </div>
</template>

<script>
import { getUserList, getOrganTree } from '@/api/authority-management'
import { getAuthPortalResource, editAuthPortalResource } from '@/api/portal-manage'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import ResourceAllot from './components/ResourceAllot'
import { PortalUserTableConfig, PortalUserFilterConfig } from '@/data/portal-manage'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    ResourceAllot
  },
  data() {
    return {
      id: 'portal-authority',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      PortalUserFilterConfig,
      PortalUserTableConfig,
      resourceAllotVisible: false,
      treeExtend: true,
      treeData: {
        title: '',
        list: []
      }
    }
  },

  created() {
    this.__updateOrganTree()
    this.__fetchData()
  },
  methods: {
    // 接口获取组织机构树
    __updateOrganTree() {
      getOrganTree().then(response => {
        // 更新左侧树结构数据
        this.treeData.list = response.data
      })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['workNumber', 'loginName', 'userName']
      }
      const query = Object.assign(this.listQuery, filter)
      this.listLoading = false
      getUserList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.$set(this.listQuery, 'page', 1)
      this.__fetchData()
    },

    // 打开资源配置弹窗
    openResourceAllot(row) {
      this.resourceAllotVisible = true
      getAuthPortalResource(row.sysUserId).then(response => {
        const checkedResource = response.data.filter(item => item.checked === 1)
        const cfgResourceIds = []
        if (checkedResource && checkedResource.length > 0) {
          checkedResource.forEach(item => {
            cfgResourceIds.push(item.cfgResourceId)
          })
        }
        this.$refs.resourceAllot.updataForm({
          cfgResourceIds,
          userIds: row.sysUserId
        })
      })
    },

    // 分配资源
    allotResource(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData, {
        cfgResourceIds: submitData.cfgResourceIds.join(',')
      })
      editAuthPortalResource(query).then(response => {
        this.resourceAllotVisible = false
        this.$message.success('分配成功')
        this.$refs.resourceAllot.resetForm()
      }).catch(err => {
        console.log(err)
        this.$refs.resourceAllot.resetSubmitBtn()
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      console.log(data)
      const entity = {
        sysDeptId: data.value
      }
      console.log(entity)
      this.filter = Object.assign(this.filter, { entity })
      this.queryData()
    }
  }
}
</script>
