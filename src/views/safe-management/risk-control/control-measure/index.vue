<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar :config="controlMeasureFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
      <list-table :id="id" :list="list" :list-loading="listLoading" :config="controlMeasureConfig" height="calc(100% - 157px)" @other-click="workable" />
      <div v-show="total > 0" class="page-bottom">
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="__fetchData"
        />
      </div>
    </div>
    <!-- 展开详情 -->
    <detail-dialog
      ref="detailDialog"
      :config="initDetailConfig()"
      :dialog-visible="detailDialogVisible"
      @close-dialog="detailDialogVisible = false"
      @open-dialog="openDialog"
    />
    <!-- 新建弹窗 -->
    <form-dialog
      ref="createDetailDialog"
      :config="initCreateDetailConfig()"
      :dialog-visible="createDetailDialogVisible"
      @close-dialog="createDetailDialogVisible = false"
      @submit="createDetailSubmit"
    />
    <!-- 详情编辑弹窗 -->
    <form-dialog
      ref="editDetailDialog"
      :config="initEditDetailConfig()"
      :dialog-visible="editDetailDialogVisible"
      @close-dialog="editDetailDialogVisible = false"
      @submit="editDetailSubmit"
    />
  </div>
</template>

<script>
import {
  getAqglRiskIdentifyList,
  saveRiskMeasures,
  getRiskMeasuresById,
  editRiskMeasures
} from '@/api/assessment-library'
import {
  getsysDictListById
} from '@/api/hidden-danger'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import TreeBar from '@/components/TreeBar'
import DetailDialog from './components/DetailDialog/index.vue'
import {
  controlMeasureConfig,
  controlMeasureFilterConfig,
  controlMeasureImplementationConfig
} from '@/data/control-measure'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    TreeBar,
    DetailDialog
  },
  data() {
    return {
      id: 'assessment-library',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      controlMeasureConfig,
      controlMeasureFilterConfig,
      controlMeasureImplementationConfig,
      treeExtend: true,
      treeData: {
        title: '选择风险类型',
        list: []
      },
      detailDialogVisible: false,
      editDetailDialogVisible: false,
      createDetailDialogVisible: false
    }
  },
  created() {
    this.__fetchData()
    this.__fetchSelectList()
  },
  methods: {
    __fetchSelectList() {
      const query = [{
        parentId: 10028
      }, {
        parentId: 10042
      }, {
        parentId: 18
      }, {
        parentId: 10054
      }, {
        parentId: 10060
      }, {
        parentId: 10066
      }, {
        parentId: 17
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
          this.controlMeasureConfig.columns.forEach(it => {
            if (query[q].parentId == 10028) {
              if (it.field === 'majorId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10042) {
              if (it.field === 'riskId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 18) {
              if (it.field === 'riskTypeId') {
                this.treeData.list = selectList
                it.options = selectList
              }
            } else if (query[q].parentId == 10054) {
              if (it.field === 'accidentPossibilityId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10060) {
              if (it.field === 'accidentHappensId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10066) {
              if (it.field === 'identifyTheTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 17) {
              if (it.field === 'riskGradeId') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          riskTypeId: this.filter.majorId,
          riskGradeId: '10075'
        },
        keyword: this.filter.name,
        keywordField: ['risk', 'identifyTheType']
      }
      getAqglRiskIdentifyList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.list = response.data.rows
          for (const _l in this.list) {
            this.list[_l].riskTypeId = this.list[_l].riskTypeId.split(',')
          }
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
    // 初始化详情窗口配置
    initDetailConfig() {
      const createConfig = Object.assign({
        title: '物探明细',
        width: '900px',
        form: this.controlMeasureImplementationConfig
      })
      return createConfig
    },
    // 初始化新建明细窗口配置
    initCreateDetailConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.controlMeasureImplementationConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditDetailConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.controlMeasureImplementationConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getRiskMeasuresById(row.aqglRiskMeasuresId).then(response => {
          const info = Object.assign(response.data)
          this.$refs[`${name}Dialog`].updataForm(info)
        })
      }
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    // 点击树形菜单时触发
    handleNodeClick(data) {
      const majorId = data.value
      this.filter = Object.assign(this.filter, { majorId })
      this.__fetchData()
    },
    // 点击落实情况触发
    workable(data) {
      this.aqglRiskIdentifyId = data.aqglRiskIdentifyId
      this.detailDialogVisible = true
      this.$refs.detailDialog.queryData(data.aqglRiskIdentifyId)
    },
    createDetailSubmit(submitData) {
      const query = Object.assign(submitData, {
        aqglRiskIdentifyId: this.aqglRiskIdentifyId
      })
      saveRiskMeasures(submitData).then(response => {
        this.createDetailDialogVisible = false
        this.$refs.createDetailDialog.resetForm()
        this.$refs.detailDialog.__fetchData()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDetailDialog.resetSubmitBtn()
      })
    },
    // 明细详情编辑
    editDetailSubmit(submitData) {
      const query = Object.assign(submitData, {
        aqglRiskIdentifyId: this.aqglRiskIdentifyId
      })
      editRiskMeasures(query).then(response => {
        this.editDetailDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDetailDialog.resetForm()
        this.$refs.detailDialog.__fetchData()
      }).catch(err => {
        this.$refs.editDetailDialog.resetSubmitBtn()
      })
    }
  }
}
</script>
