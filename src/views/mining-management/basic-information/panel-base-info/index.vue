<template>
  <div class="page-container">
    <filter-bar :config="panelBaseInfoFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="panelBaseInfoConfig"
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
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
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
  selectCoalcodeInfoList,
  getMineareaInfoList,
  saveMineareaInfo,
  getMineareaInfoById,
  updateMineareaInfo,
  deleteMineareaInfo,
  batchDeleteMineareaInfo,
  selectLevelInfo
} from '@/api/mining-management'
import {
  panelBaseInfoConfig,
  panelBaseInfoFilterConfig
} from '@/data/mining-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
  },
  data() {
    return {
      id: 'organization',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      panelBaseInfoFilterConfig,
      panelBaseInfoConfig,
      deleteDisabled: true,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: []
    }
  },
  created() {
    this.__fetchLevelList()
    this.__fetchCoalSeam()
    this.__fetchData()
  },
  methods: {
    __fetchLevelList() {
      selectLevelInfo().then(response => {
        this.panelBaseInfoConfig.columns.forEach(it => {
          if (it.field == 'level') {
            it.options = response.data
          }
        })
      })
    },
    __fetchCoalSeam() {
      selectCoalcodeInfoList().then(response => {
        this.panelBaseInfoConfig.columns.forEach(it => {
          if (it.field == 'coalFieldId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.name,
        keywordField: ['mineAreaName', 'coalField', 'levelName'],
        sort: {
          asc: ['orderNum']
        }
      }
      getMineareaInfoList(query).then(response => {
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
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.panelBaseInfoConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.panelBaseInfoConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getMineareaInfoById(row.cjglMineareaInfoId).then(response => {
          const info = Object.assign(response.data)
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该采区基本信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMineareaInfo(row.cjglMineareaInfoId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.cjglMineareaInfoId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的采区基本信息')
        return false
      }
      this.$confirm('确定删除所选中采区基本信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteMineareaInfo(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      saveMineareaInfo(submitData).then(response => {
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      }).catch(er => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateMineareaInfo(submitData).then(response => {
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.editDialogVisible = false
        this.$message.success('编辑成功')
      }).catch(er => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 改变所选项
    selectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
    }
  }
}
</script>
