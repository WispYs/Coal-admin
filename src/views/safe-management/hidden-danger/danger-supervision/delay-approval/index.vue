<template>
  <div class="page-container">
    <div class="filter-bar">
      <filter-bar :config="reformFilterConfig" style="display: inline-block;" @search-click="queryData" />
    </div>
    <!-- 表格 -->
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="delayApprovalTableConfig"
      height="calc(100% - 157px)"
      @other-click="otherClick"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />
    <!-- 新建弹窗 -->
    <form-dialog
      ref="createDialog"
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />
  </div>
</template>
<script>
import {
  getAqglHiddenRegister,
  getsysDictListById,
  saveReviewMsg
} from '@/api/hidden-danger'
import {
  getAqglHiddenTissueTree
} from '@/api/organization'
import {
  getOrganTree
} from '@/api/authority-management'
import ListTable from '@/components/ListTable'
import { delayApprovalTableConfig, reformFilterConfig, delayApprovalBttonConfig } from '@/data/hidden-danger'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
import FormDialog from '@/components/FormDialog'
export default {
  components: {
    ListTable,
    Pagination,
    FilterBar,
    FormDialog
  },
  data() {
    return {
      id: 'reform',
      listLoading: true,
      delayApprovalTableConfig,
      reformFilterConfig,
      delayApprovalBttonConfig,
      list: [],
      listQuery: {
        page: 1,
        pagerows: 10
      },
      total: 1,
      filter: {},
      selectCheckbox: {},
      createDialogVisible: false,
      formConfig: []
    }
  },
  created() {
    this.__fetchHiddenUnit()
    this.__fetchSelectList()
    this.__fetchUnit()
    this.__fetchData()
  },
  methods: {
    __fetchUnit() {
      getOrganTree().then(response => {
        // 更新新增、编辑config数据
        this.delayApprovalTableConfig.columns.forEach(it => {
          if (it.field === 'examineUnit') {
            it.options = response.data
          } else if (it.field === 'reviewUnitId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchHiddenUnit() {
      const query = {
        aqglHiddenTissueId: ''
      }
      getAqglHiddenTissueTree(query).then(response => {
        this.delayApprovalTableConfig.columns.forEach(it => {
          if (it.field === 'hiddenDeptId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchSelectList() {
      const query = [{
        parentId: 10088
      }, {
        parentId: 10092
      }, {
        parentId: 10042
      }, {
        parentId: 10097
      }, {
        parentId: 10106
      }, {
        // 隐患状态
        parentId: 10115
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              value: response.data[m].sysDictId,
              label: response.data[m].dictName
            })
          }
          this.delayApprovalTableConfig.columns.forEach(it => {
            if (query[q].parentId == 10088) {
              if (it.field === 'examineShiftId') {
                it.options = selectList
                console.log(it)
              }
            } else if (query[q].parentId == 10092) {
              if (it.field === 'examineTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10042) {
              if (it.field === 'examinePathId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10097) {
              if (it.field === 'hiddenTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10106) {
              if (it.field === 'hiddenGrade') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10115) {
              if (it.field === 'hiddenStatus') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    __fetchData() {
      this.listLoading = false
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          hiddenStatus: 10118,
          isPostpone: 0
        },
        keyword: this.filter.name,
        keywordField: ['hiddenContent', 'rectifyPlan']
      }
      getAqglHiddenRegister(query).then(response => {
        console.log(response)
        if (response.data.rows.length > 0) {
          console.log(response)
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.records)
        } else {
          if (this.listQuery.page > 0) {
            this.listQuery.page = this.listQuery.page - 1
            this.__fetchData()
          } else {
            this.listLoading = false
            this.list = []
            this.total = 0
          }
        }
      }).catch(err => {
        this.listLoading = false
      })
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.delayApprovalBttonConfig.columns
      })
      return createConfig
    },
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    hiddenAcceptance() {
      this.createDialogVisible = true
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        aqglHiddenRegisterId: this.selectCheckbox.aqglHiddenRegisterId,
        reviewType: 1
      })
      saveReviewMsg(query).then(response => {
        this.createDialogVisible = false
        this.$message.success('创建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    otherClick(data, index, name) {
      this.selectCheckbox = data
      if (name == '延期审批') {
        this.hiddenAcceptance()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
