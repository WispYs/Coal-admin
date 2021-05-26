<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar ref="treeBar" :tree-data="treeData" @handleNodeClick="handleNodeClick" />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="EquipmentServiceFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @check-spare="checkSpareVisible = true"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="EquipmentServiceTableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @other-click="otherClick"
        @text-click="textClick"
        @submit-data="editSubmit"
        @selection-change="selectionChange"
      />

      <div v-show="total>0" class="page-bottom">
        <el-button
          class="page-bottom__delete"
          type="warning"
          size="small"
          plain
          :disabled="deleteDisabled"
          @click="deleteBatches"
        >
          <i class="el-icon-delete el-icon--left" />批量删除
        </el-button>
        <pagination
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
        @upload-click="(row) => openUploadDialog('createDialog', row)"
        @close-dialog="createDialogVisible = false"
        @submit="createSubmit"
      />
      <!-- 编辑弹窗 -->
      <form-dialog
        ref="editDialog"
        :config="initEditConfig()"
        :dialog-visible="editDialogVisible"
        @upload-click="(row) => openUploadDialog('editDialog', row)"
        @close-dialog="editDialogVisible = false"
        @submit="editSubmit"
      />
      <!-- 检修进展 -->
      <service-progress
        ref="serviceProgress"
        :dialog-visible="serviceProgressVisible"
        @close-dialog="serviceProgressVisible = false"
      />
      <!-- 查看备品备件 -->
      <check-spare
        ref="checkSpare"
        :dialog-visible="checkSpareVisible"
        @close-dialog="checkSpareVisible = false"
      />
      <!-- 附件查看 -->
      <preview-files
        ref="previewFiles"
        :dialog-visible="previewFilesVisible"
        @close-dialog="previewFilesVisible = false"
        @upload-click="(row) => openUploadDialog('previewFiles', row)"
        @update-file="updatePreviewFile"
      />
      <!-- 上传附件 -->
      <upload-file
        :dialog-visible="uploadDialogVisible"
        @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit"
      />
    </div>
  </div>
</template>

<script>
import { getEquipmentServiceList, createEquipmentService, getEquipmentServiceInfo, editEquipmentService, delEquipmentService, getRepairList } from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from './components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import PreviewFiles from '@/components/PreviewFiles'
import ServiceProgress from './components/ServiceProgress'
import CheckSpare from './components/CheckSpare'
import { EquipmentServiceTableConfig, EquipmentServiceFilterConfig } from '@/data/mechatronics'
import { parseTime } from '@/utils'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile,
    PreviewFiles,
    ServiceProgress,
    CheckSpare
  },
  data() {
    return {
      id: 'equipment-service',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      currentNum: 0, // 当前页数据数量，用于判断删除后是否跳转到上一页
      filter: {}, // 筛选项
      listLoading: true,
      EquipmentServiceFilterConfig,
      EquipmentServiceTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      serviceProgressVisible: false, // 进展弹窗
      checkSpareVisible: false, // 查看备品备件
      previewFilesVisible: false, // 附件查看
      treeExtend: true,
      treeData: {
        title: '',
        tId: 'id',
        list: []
      },
      uploadRow: null, // 上传文件信息
      uploadDialogVisible: false,
      status: null, // 状态id
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__fetchData()
    // 初始化检修状态树
    this.__updateServiceStatusTree()
    // 获取所属场所下拉框数据
    this.__updateEquipPlace()
    // 获取处理结果数据
    this.__updateHandleResult()
    // 获取检修类型数据
    this.__updateServiceType()
  },
  methods: {
    // 初始化检修状态树
    __updateServiceStatusTree() {
      // 数据字典 - 检修状态
      const parentId = 111345
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

        const placeData = []
        data.forEach(it => {
          placeData.push({
            label: it.label,
            value: it.id
          })
        })
        EquipmentServiceTableConfig.columns.forEach(it => {
          if (it.field === 'status') {
            it.options = placeData
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取所属场所下拉框数据
    __updateEquipPlace() {
      this.$store.dispatch('mecha/getEquipPlaceList').then((data) => {
        const placeData = []
        data.forEach(it => {
          placeData.push({
            label: it.typeName,
            value: it.id + ''
          })
        })
        EquipmentServiceTableConfig.columns.forEach(it => {
          if (it.field === 'deviceTypeId') {
            it.options = placeData
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取检修类型数据
    __updateServiceType() {
      // 数据字典 - 检修类型
      const parentId = 111351
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        EquipmentServiceTableConfig.columns.forEach(it => {
          if (it.field === 'oveType') {
            it.options = data
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取处理结果数据
    __updateHandleResult() {
      // 数据字典 - 检修处理
      const parentId = 111348
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        EquipmentServiceTableConfig.columns.forEach(it => {
          if (it.field === 'handleResult') {
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
        keywordField: ['faultTheme', 'situation'],
        status: this.status
      }
      const query = Object.assign(this.listQuery, filter)
      getEquipmentServiceList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          it.handleTime = parseTime(it.handleTime)
        })
        this.list = response.data.rows
        this.total = Number(response.data.records)
        this.currentNum = response.data.rows.length
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.$set(this.listQuery, 'page', 1)
      this.__fetchData()
    },

    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.EquipmentServiceTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.EquipmentServiceTableConfig.columns
      })
      return editConfig
    },

    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 如果有数据，更新子组件的 formData
      if (row) {
        this.$refs[`${name}Dialog`].updataForm(row)
        getEquipmentServiceInfo(row.id).then(response => {
          const info = Object.assign(response.data, {
            handleTime: parseTime(response.data.handleTime),
            oveType: response.data.oveType + '',
            deviceTypeId: response.data.deviceTypeId + '',
            status: response.data.status + '',
            handleResult: response.data.handleResult + '',
            handleBy: response.data.handleBy + ''
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 附件预览上传回调
    updatePreviewFile(submitData) {
      return new Promise((resolve, reject) => {
        // 编辑方法
        editEquipmentService(submitData).then(response => {
          this.$message.success('编辑成功')
          this.__fetchData()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 附件查看
    textClick(value, row, layout) {
      if (layout === 'Upload') {
        this.$refs.previewFiles.updataForm(value, row)
        this.previewFilesVisible = true
      }
    },
    otherClick(row) {
      getRepairList({ bnsId: row.deviceTypeId }).then(response => {
        const info = {
          belongPlace: row.belongPlace,
          deviceName: row.deviceName,
          faultTheme: row.faultTheme,
          situation: row.situation,
          occurTime: row.occurTime,
          daily: response.data.rows
        }
        this.$refs.serviceProgress.updataForm(info)
        this.serviceProgressVisible = true
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除当前页最后一条数据后跳转到前一页
    /**
     * @params{number} num 删除数量
     */
    changeCurrentPage(num) {
      this.currentNum = this.currentNum - num
      if (this.currentNum <= 0) {
        if (this.listQuery.page > 1) {
          this.$set(this.listQuery, 'page', this.listQuery.page - 1)
        }
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delEquipmentService(row.id).then(response => {
          this.$message.success('删除成功')
          this.changeCurrentPage(1)
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createEquipmentService(query).then(response => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 编辑
    editSubmit(submitData) {
      const query = Object.assign(submitData)
      editEquipmentService(query).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
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
      console.log(fileList)
      this.$refs[this.dialogRef].updateFile(fileList)
      this.uploadDialogVisible = false
    },

    // 改变所选项
    selectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
      console.log(this.multipleSelection)
    },

    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.id))
      console.log(selectId)
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的项')
        return false
      }
      this.$confirm('确定删除所选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        this.$message.success('删除成功')
        this.changeCurrentPage(selectId.length)
        this.__fetchData()
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      this.status = data.id
      this.queryData()
    }
  }
}
</script>
