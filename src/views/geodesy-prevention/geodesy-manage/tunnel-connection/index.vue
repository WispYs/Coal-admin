<template>
  <div class="page-container">
    <filter-bar
      :config="tunnelConnectionFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="tunnelConnectionConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @other-click="(row) => openDetailDialog(row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
    />
    <div v-show="total>0" class="page-bottom">
      <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="pagination"
      />
    </div>
    <!-- 新建弹窗 -->
    <form-dialog
      ref="createDialog"
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @select-change="selectChange"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @select-change="selectChange"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />
    <operation-file
      ref="fileDialog"
      :dialog-visible="fileDialogVisible"
      @upload-click="(row) => openUploadDialog('fileDialog', row)"
      @close-dialog="fileDialogVisible = false"
    />
  </div>
  </div>
</template>

<script>
import {
  searchTunnelThrough,
  saveTunnelThrough,
  getTunnelThroughById,
  updateTunnelThrough,
  deleteTunnelThrough,
  batchDeleteTunnelThrough
} from '@/api/geodesy-prevention'
import {
  selectTunnelList,
  getTunnelById
} from '@/api/mining-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import OperationFile from './compentents/operation-file'
import {
  tunnelConnectionFilterConfig,
  tunnelConnectionConfig,
  geophysicalProspectingInfoDetailedConfig,
  geophysicalProspectingInfoDetailedFilterConfig
} from '@/data/geodesy-prevention'
export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    OperationFile
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
      tunnelConnectionConfig,
      tunnelConnectionFilterConfig,
      geophysicalProspectingInfoDetailedFilterConfig,
      geophysicalProspectingInfoDetailedConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      detailDialogVisible: false,
      fileDialogVisible: false,
      deleteDisabled: true,
      riskFilterList: [],
      checkData: [],
      detectInfoId: ''
    }
  },
  created() {
    this.__fetchData()
    this.__fetchTunnelList()
  },
  methods: {
    __fetchTunnelList() {
      selectTunnelList().then(response => {
        this.tunnelConnectionConfig.columns.forEach(it => {
          if (it.field == 'tunnelId') {
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
        keyword: _filter,
        keywordField: ['tunnelName']
      }
      searchTunnelThrough(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.list = response.data.rows
          this.list.forEach(it => {
            if (it.isForewarning == 0) {
              it.isForewarning = '否'
            } else if (it.isForewarning == 1) {
              it.isForewarning = '是'
            }
            if (it.isAlarm == 0) {
              it.isAlarm = '否'
            } else if (it.isAlarm == 1) {
              it.isAlarm = '是'
            }
          })
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
    pagination(data) {
      this.listQuery.page = data.page
      this.listQuery.pagerows = data.limit
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.tunnelConnectionConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.tunnelConnectionConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getTunnelThroughById(row.dcfzsTunnelThroughId).then(response => {
          const info = Object.assign(response.data)
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 打开特有属性操作查看弹窗
    openDetailDialog(item) {
      console.log(item)
      this.fileDialogVisible = true
      this.$refs.fileDialog.updataForm(id)
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTunnelThrough(row.dcfzsTunnelThroughId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.checkData.forEach(it => selectId.push(it.dcfzsTunnelThroughId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的数据')
        return false
      }
      this.$confirm('确定删除所选中数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        batchDeleteTunnelThrough(selectId).then(response => {
          console.log(response)
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    selectChange(_data, _val, _form) {
      console.log(_data, _val, _form)
      getTunnelById(_val).then(response => {
        console.log(response.data)
        _form = Object.assign(_form, {
          lithologyType: response.data.lithologyType
        })
        this.$refs.createDialog.updataForm(_form)
      })
    },
    // submit data
    createSubmit(submitData) {
      saveTunnelThrough(submitData).then(response => {
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateTunnelThrough(submitData).then(response => {
        this.__fetchData()
        this.$refs.editDialog.resetForm()
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
