<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar :config="FilterConfig" @search-click="queryData" @create-click="openDialog('create')" @reset-click="queryData" />
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="TableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @submit-data="editSubmit"
        @selection-change="selectionChange"
      />
      <div v-show="total > 0" class="page-bottom">
        <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
          <i class="el-icon-delete el-icon--left" />批量删除
        </el-button>
        <pagination
          v-show="total >0"
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
  aqglRiskSystemList,
  saveAqglRiskSystem,
  deleteAqglRiskTissue,
  updateAqglRiskSystem,
  getaqglRiskSystemById,
  batchDeleteRiskSystem
} from '@/api/liability-system'
import {
  getRiskOrganizationSelect
} from '@/api/organization'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import TreeBar from '@/components/TreeBar'
import {
  TableConfig,
  FilterConfig
} from '@/data/liability-system'

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
      id: 'liability-system',
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
      treeData: {
        title: '风险组织结构',
        list: []
      },
      riskFilterList: [],
      deleteDisabled: true,
      checkData: [],
      organizationId: ''
    }
  },
  created() {
    this.__fetchData()
    this.__getRiskSystemTree()
  },
  methods: {
    __getRiskSystemTree() {
      getRiskOrganizationSelect().then(response => {
        this.treeData.list = response.data
        TableConfig.columns.forEach(it => {
          if (it.field === 'aqglRiskTissueId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchData(_filter) {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          aqglRiskTissueId: this.organizationId
        },
        keyword: _filter,
        keywordField: ['riskName', 'position']
      }
      aqglRiskSystemList(query).then(response => {
        if (response.data.rows.length > 0) {
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
    // 查询数据
    queryData(filter) {
      this.__fetchData(filter.name)
    },
    // 根据组织机构查询组织机构下面的风险责任体系
    handleNodeClick(_data) {
      this.organizationId = _data.value
      this.__fetchData()
    },
    pagination(row) {
      this.listQuery.page = row.page
      this.listQuery.pagerows = row.limit
      this.__fetchData()
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
        row.aqglRiskSystemId = Number(row.aqglRiskSystemId)
        row.aqglRiskTissueId = Number(row.aqglRiskTissueId)
        getaqglRiskSystemById(row.aqglRiskSystemId).then(response => {
          const info = Object.assign(response.data, {
            aqglRiskTissueId: Number(response.data.aqglRiskTissueId) || 0
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(data) {
      this.$confirm('确定删除该条风险责任体系?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAqglRiskTissue(data.aqglRiskSystemId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.checkData.forEach(it => selectId.push(it.aqglRiskSystemId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的风险责任体系')
        return false
      }
      this.$confirm('确定删除所选中风险责任体系?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        batchDeleteRiskSystem(selectId).then(response => {
          console.log(response)
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      saveAqglRiskSystem(submitData).then(response => {
        this.$refs.createDialog.resetForm()
        this.__fetchData()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateAqglRiskSystem(submitData).then(response => {
        this.$refs.editDialog.resetForm()
        this.__fetchData()
        this.editDialogVisible = false
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    selectionChange(data) {
      this.checkData = data
      if (this.checkData.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
    }
  }
}
</script>
