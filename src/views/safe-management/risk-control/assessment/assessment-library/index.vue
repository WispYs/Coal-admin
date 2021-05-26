<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="FilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @identificationEnd="identificationEnd"
        @reset-click="queryData"
      />
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="TableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @selection-change="selectionChange"
        @submit-data="editSubmit"
      />
      <div v-show="total > 0" class="page-bottom">
        <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
          <i class="el-icon-delete el-icon--left" />批量删除
        </el-button>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="pagination"
        />
      </div>
    </div>
    <!-- 新建弹窗 -->
    <form-dialog
      ref="createDialog"
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />

  </div>
</template>

<script>
import {
  getAqglRiskIdentifyList,
  saveAqglRiskIdentify,
  updateAqglRiskIdentify,
  deleteAqglRiskIdentify,
  getAqglRiskIdentifyById,
  batchDeleteRiskIdentify
} from '@/api/assessment-library'
import {
  getsysDictListById,
  endRiskRecognize,
  getSelectRiskList
} from '@/api/hidden-danger'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import TreeBar from '@/components/TreeBar'
import {
  TableConfig,
  FilterConfig
} from '@/data/assessment-library'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    TreeBar
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
      FilterConfig,
      TableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      riskFilterList: [],
      treeData: {
        title: '选择专业',
        list: []
      },
      checkBox: [],
      deleteDisabled: true,
      majorId: '',
      risk:[]
    }
  },
  created() {
    this.__fetchSelectList()
    this.__fetchRisk()
    this.__fetchData()
  },
  methods: {
    __fetchRisk(){
      getSelectRiskList().then(response =>{
        console.log(response);
        this.TableConfig.columns.forEach(it => {
            if (it.field === 'riskId') {
              this.risk= response.data
              it.options = response.data
            }
        })
      })
    },
    __fetchSelectList() {
      const query = [{
        parentId: 10028
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
          this.TableConfig.columns.forEach(it => {
            if (query[q].parentId == 10028) {
              if (it.field === 'majorId') {
                this.treeData.list = selectList
                it.options = selectList
              }
            } else if (query[q].parentId == 18) {
              if (it.field === 'riskTypeId') {
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
          majorId: this.majorId
        },
        keyword: this.filter.name,
        keywordField: ['riskUserName']
      }
      getAqglRiskIdentifyList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.list = response.data.rows
          for (const _l in this.list) {
            this.list[_l].riskTypeId = this.list[_l].riskTypeId.split(',')
          }
          this.total = Number(response.data.records)
          console.log(this.list)
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
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    pagination() {
      this.__fetchData()
    },
    // 点击树形菜单时触发
    handleNodeClick(data) {
      this.majorId = data.value
      this.__fetchData()
    },
    // 点击辨识结束按钮触发
    identificationEnd() {
      endRiskRecognize(this.checkBox[0].aqglRiskIdentifyId).then(response => {
        this.__fetchData()
        this.$message.success('辨识结束')
      })
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.TableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.TableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getAqglRiskIdentifyById(row.aqglRiskIdentifyId).then(response => {
          const riskTypeId = response.data.riskTypeId.split(',')
          const info = Object.assign(response.data, {
            accidentHappensId: Number(response.data.accidentHappensId) || 0,
            riskTypeId: riskTypeId
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    selectionChange(row) {
      this.checkBox = row
      if (this.checkBox.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
    },
    // 删除
    deleteClick(data) {
      this.$confirm('确定删除该条风险辨识库信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAqglRiskIdentify(data.aqglRiskIdentifyId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.checkBox.forEach(it => selectId.push(it.aqglRiskIdentifyId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的风险辨识库信息')
        return false
      }
      this.$confirm('确定删除所选中风险辨识库信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          entityIds: selectId
        }
        batchDeleteRiskIdentify(query.entityIds).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      let risk= this.risk.filter(p => p.value === submitData.riskId)[0]
      let riskTypeId = ''
      for (const s in submitData.riskTypeId) {
        if (!riskTypeId) {
          riskTypeId = submitData.riskTypeId[s]
        } else {
          riskTypeId = riskTypeId + ',' + submitData.riskTypeId[s]
        }
      }
      submitData.riskTypeId = riskTypeId
      submitData.riskId = risk.value
      submitData.risk = risk.label
      const query = Object.assign(submitData, {
        riskValue: Number(submitData.riskValue) || 0,
        capital: Number(submitData.capital) || 0,
        personMax: Number(submitData.personMax) || 0
      })
      saveAqglRiskIdentify(query).then(response => {
        this.__fetchData()
        this.createDialogVisible = false
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      let risk= this.risk.filter(p => p.value === submitData.riskId)[0]
      let riskTypeId = ''
      for (const s in submitData.riskTypeId) {
        if (!riskTypeId) {
          riskTypeId = submitData.riskTypeId[s]
        } else {
          riskTypeId = riskTypeId + ',' + submitData.riskTypeId[s]
        }
      }
      submitData.riskTypeId = riskTypeId
      submitData.riskId = risk.value
      submitData.risk = risk.label
      const query = Object.assign(submitData, {
        riskValue: Number(submitData.riskValue) || 0,
        capital: Number(submitData.capital) || 0,
        personMax: Number(submitData.personMax) || 0
      })
      console.log(query);
      updateAqglRiskIdentify(query).then(response => {
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.editDialogVisible = false
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    }
  }
}
</script>
