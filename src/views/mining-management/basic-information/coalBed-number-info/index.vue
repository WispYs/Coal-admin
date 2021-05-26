<template>
  <div class="page-container">
    <filter-bar :config="coalBedNumberInfoFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="coalBedNumberInfoConfig"
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
      @upload-click="(row) => openUploadDialog('createDialog', row)"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
      @upload-click="(row) => openUploadDialog('editDialog', row)"
    />

    <!-- 上传附件 -->
    <upload-file
      :data="uploadData"
      :dialog-visible="uploadDialogVisible"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />
  </div>
</template>

<script>
import {
  getOrganTree
} from '@/api/authority-management'
import {
  getsysDictListById
} from '@/api/hidden-danger'
import {
  getCoalcodeInfoList,
  getCoalcodeInfoById,
  saveCoalcodeInfo,
  updateCoalcodeInfo,
  deleteCoalcodeInfo,
  batchCoalcodeInfo
} from '@/api/mining-management'
import {
  coalBedNumberInfoConfig,
  coalBedNumberInfoFilterConfig
} from '@/data/mining-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile
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
      coalBedNumberInfoFilterConfig,
      coalBedNumberInfoConfig,
      deleteDisabled: true,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [],
      uploadDialogVisible: false,
      uploadData: null,
      eventId: [],
      uploadImgs: []
    }
  },
  created() {
    this.__fetchSelectList()
    this.__updateOrganTree()
    this.__fetchData()
  },
  methods: {
    // 接口获取组织机构树，更新config数据
    __updateOrganTree() {
      getOrganTree().then(response => {
        this.coalBedNumberInfoConfig.columns.forEach(it => {
          if (it.field === 'unitId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchSelectList() {
      const query = [{
        // 煤层结构
        parentId: 111203
      }, {
        // 可采性
        parentId: 111206
      }, {
        // 稳定性
        parentId: 111211
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              label: response.data[m].dictName,
              value: response.data[m].sysDictId
            })
          }
          this.coalBedNumberInfoConfig.columns.forEach(it => {
            if (query[q].parentId == 111203) {
              if (it.field === 'coalStructureId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111206) {
              if (it.field === 'workabilityId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111211) {
              if (it.field === 'stabilityId') {
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
        keyword: this.filter.name,
        keywordField: ['coalCode', 'coalField']
      }
      getCoalcodeInfoList(query).then(response => {
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
        form: this.coalBedNumberInfoConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.coalBedNumberInfoConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getCoalcodeInfoById(row.cjglCoalcodeInfoId).then(response => {
          const info = Object.assign(response.data)
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该煤层编号信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCoalcodeInfo(row.cjglCoalcodeInfoId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.cjglCoalcodeInfoId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的煤层编号信息')
        return false
      }
      this.$confirm('确定删除所选中煤层编号信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchCoalcodeInfo(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      saveCoalcodeInfo(submitData).then(response => {
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateCoalcodeInfo(submitData).then(response => {
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.editDialogVisible = false
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
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
    },
    // 打开上传文件组件
    openUploadDialog(ref, row) {
      // 记录当前打开弹窗ref
      this.dialogRef = ref
      this.uploadDialogVisible = true
      this.uploadRow = row
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      this.$refs[this.dialogRef].updateFile(fileList)
      this.uploadDialogVisible = false
    }
  }
}
</script>
