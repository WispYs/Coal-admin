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
        :config="RepairManageFilterConfig"
        @search-click="queryData"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="RepairManageTableConfig"
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
      <!-- 维修弹窗 -->
      <form-dialog
        ref="repairDialog"
        :config="initRepairConfig()"
        :dialog-visible="repairDialogVisible"
        @close-dialog="repairDialogVisible = false"
        @submit="repairSubmit"
      />
      <!-- 待修弹窗 -->
      <form-dialog
        ref="waitRepairDialog"
        :config="initWaitRepairConfig()"
        :dialog-visible="waitRepairDialogVisible"
        @close-dialog="waitRepairDialogVisible = false"
        @submit="waitRepairSubmit"
      />
    </div>
  </div>
</template>

<script>
import { getUsingList, createRepair } from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { RepairManageTableConfig, RepairManageFilterConfig, RepairTableConfig, WaitRepairTableConfig } from '@/data/mechatronics'
import { parseTime } from '@/utils'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
  },
  data() {
    return {
      id: 'repair-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      RepairManageFilterConfig,
      RepairManageTableConfig,
      RepairTableConfig,
      WaitRepairTableConfig,
      repairDialogVisible: false,
      waitRepairDialogVisible: false,
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
      // 数据字典 - 维修状态
      const parentId = 111327
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
    // 获取维修单位列表
    __updateRepairUnitTree() {
      // 数据字典 - 所属单位
      const parentId = 111133
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        RepairTableConfig.columns.forEach(it => {
          if (it.field === 'repairUnit') {
            it.options = data
          }
        })
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

    // 初始化维修窗口配置
    initRepairConfig() {
      const repairConfig = Object.assign({
        title: '维修',
        width: '1000px',
        form: this.RepairTableConfig.columns
      })
      return repairConfig
    },
    // 初始化待修窗口配置
    initWaitRepairConfig() {
      const waitRepairConfig = Object.assign({
        title: '待修',
        width: '1000px',
        form: this.WaitRepairTableConfig.columns
      })
      return waitRepairConfig
    },

    // 维修，待修按钮
    otherClick(row, index, item) {
      console.log(row)
      const info = {
        bnsId: row.id,
        machineName: row.machineName,
        modelStd: row.modelStd,
        assetsCode: row.assetsCode
      }
      if (item === '维修') {
        this.__updateRepairUnitTree()
        this.$refs.repairDialog.updataForm(info)
        this.repairDialogVisible = true
      } else if (item === '待修') {
        this.$refs.waitRepairDialog.updataForm(info)
        this.waitRepairDialogVisible = true
      }
    },
    // 维修
    repairSubmit(submitData) {
      const query = Object.assign(submitData, {
        repairState: 2
      })
      createRepair(query).then(response => {
        this.repairDialogVisible = false
        this.$message.success('维修成功')
        this.$refs.repairDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.repairDialog.resetSubmitBtn()
      })
    },
    // 待修
    waitRepairSubmit(submitData) {
      const query = Object.assign(submitData, {
        repairState: 1
      })
      createRepair(query).then(response => {
        this.waitRepairDialogVisible = false
        this.$message.success('待修成功')
        this.$refs.waitRepairDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.repairDialog.resetSubmitBtn()
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
