<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      ref="treeBar"
      :tree-data="treeData"
      @handleNodeClick="handleNodeClick"
      @handleSwitch="handleSwitch"
    />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="StandingBookFilterConfig"
        @search-click="queryData"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="StandingBookTableConfig"
        height="calc(100% - 157px)"
        @other-click="otherClick"
      />

      <div v-show="total>0" class="page-bottom">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="__fetchData"
        />
      </div>
      <!-- 生命周期信息 -->
      <lifecycle
        ref="lifecycleDialog"
        :dialog-visible="lifecycleDialogVisible"
        @close-dialog="lifecycleDialogVisible = false"
      />
    </div>
  </div>
</template>

<script>
import { getUsingList, getLedgerLifeCycle } from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import Lifecycle from './components/Lifecycle'
import { StandingBookTableConfig, StandingBookFilterConfig } from '@/data/mechatronics'
import { parseTime } from '@/utils'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    Lifecycle
  },
  data() {
    return {
      id: 'standing-book',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      StandingBookFilterConfig,
      StandingBookTableConfig,
      lifecycleDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '设备类型',
        title2: '状态选择',
        tId: 'id',
        list: []
      },
      treeSelectId: '', //  左侧树型结构id
      tabIndex: '0' //  左侧树型结构tab
    }
  },

  created() {
    this.__fetchData()
    this.__updateCategoryTree()
  },
  methods: {
    // 获取设备类型树结构列表
    __updateCategoryTree() {
      this.$store.dispatch('mecha/getCategoryList').then((data) => {
        data.forEach(it => {
          it.label = it.typeName
        })
        this.treeData.list = [{
          id: '',
          label: '全部',
          children: data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey('')
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取状态选择列表
    __updateStatusTree() {
      // 数据字典 - 设备状态
      const parentId = 111317
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.id = it.dictValue
          it.label = it.dictName
        })
        this.treeData.list = [{
          id: '',
          label: '全部',
          children: data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey('')
      }).catch((err) => {
        console.log(err)
      })
    },

    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['machineName']
      }
      let query = {}
      if (this.tabIndex === '0') {
        query = Object.assign(this.listQuery, filter, {
          machineTypeId: this.treeSelectId
        })
        delete query.status
      } else {
        query = Object.assign(this.listQuery, filter, {
          status: this.treeSelectId
        })
        delete query.machineTypeId
      }
      getUsingList(query).then(response => {
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

    // 生命周期按钮
    otherClick(row, index, item) {
      console.log(row)
      getLedgerLifeCycle(row.id).then(response => {
        const info = {
          machineName: row.machineName,
          modelStd: row.modelStd,
          assetsCode: row.assetsCode,
          procFactory: row.procFactory,
          outTime: row.outTime,
          unit: row.unit,
          dailys: response.data
        }
        this.$refs.lifecycleDialog.updataForm(info)
        this.lifecycleDialogVisible = true
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      this.treeSelectId = data.id
      this.queryData()
    },
    // 点击切换树型菜单
    handleSwitch(tab) {
      this.tabIndex = tab.index
      if (this.tabIndex === '0') {
        this.__updateCategoryTree()
      } else {
        this.__updateStatusTree()
      }
    }
  }
}
</script>
