<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      ref="treeBar"
      :tree-data="treeData"
      :default-props="treeProp"
      @handleNodeClick="handleNodeClick"
    />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="StorageFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="StorageTableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @other-click="openOutDialog"
        @delete-click="deleteClick"
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
        @select-change="placeSelect"
        @close-dialog="createDialogVisible = false"
        @submit="createSubmit"
      />
      <!-- 编辑弹窗 -->
      <form-dialog
        ref="editDialog"
        :config="initEditConfig()"
        :dialog-visible="editDialogVisible"
        @select-change="placeSelect"
        @close-dialog="editDialogVisible = false"
        @submit="editSubmit"
      />
      <!-- 设备出库弹窗 -->
      <form-dialog
        ref="outDialog"
        :config="initOutConfig()"
        :dialog-visible="outDialogVisible"
        @upload-click="(row) => openUploadDialog('outDialog', row)"
        @close-dialog="outDialogVisible = false"
        @submit="outSubmit"
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
import {
  getStorageList,
  createStorage,
  getStorageInfo,
  editStorage,
  delStorage,
  createOutStorage
} from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import { parseTime } from '@/utils'
import { StorageTableConfig, StorageFilterConfig, OutTableConfig } from '@/data/mechatronics'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile
  },
  data() {
    return {
      id: 'storage-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      currentNum: 0, // 当前页数据数量，用于判断删除后是否跳转到上一页
      filter: {}, // 筛选项
      listLoading: true,
      StorageFilterConfig,
      StorageTableConfig,
      OutTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      outDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '选择设备类型',
        tId: 'id',
        list: []
      },
      treeProp: {
        children: 'children',
        label: 'typeName'
      },
      machineTypeId: '', //  设备类型id
      uploadRow: null, // 上传文件信息
      uploadDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__fetchData()
    this.__updateCategoryTree()
    this.__initFactory()
  },
  methods: {
    // 获取设备类型树结构列表
    __updateCategoryTree() {
      this.$store.dispatch('mecha/getCategoryList').then((data) => {
        this.treeData.list = [{
          id: '',
          typeName: '全部',
          children: data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey('')

        // 更新设备类型下拉框数据config
        const typeData = []
        data.forEach(it => {
          typeData.push({
            label: it.typeName,
            value: it.id + ''
          })
        })
        StorageTableConfig.columns.forEach(it => {
          if (it.field === 'machineTypeId') {
            it.options = typeData
          }
        })
        // 出库
        OutTableConfig.columns.forEach(it => {
          if (it.field === 'machineTypeId') {
            it.options = typeData
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 初始化生产厂家下拉框数据
    __initFactory() {
      this.$store.dispatch('mecha/getSupplierList').then((data) => {
        const placeData = []
        data.forEach(it => {
          placeData.push({
            label: it.supName,
            value: it.id + ''
          })
        })
        StorageTableConfig.columns.forEach(it => {
          if (it.field === 'procFactory') {
            it.options = placeData
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取资产类型列表
    __updateRepairUnitTree() {
      // 数据字典 - 资产类型
      const parentId = 14
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        StorageTableConfig.columns.forEach(it => {
          if (it.field === 'assetsType') {
            it.options = data
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取领用单位列表
    __updatePickUnitTree() {
      // 数据字典 - 所属单位
      const parentId = 111133
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        OutTableConfig.columns.forEach(it => {
          if (it.field === 'pickUnit') {
            it.options = data
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },

    // 改变设备类型选项
    placeSelect(item, row) {
      if (item.field === 'machineTypeId') {
        // 获取设备类型下设备型号列表
        this.getModelList(row)
      }
    },
    // 获取设备类型下设备型号列表，更新config
    getModelList(id) {
      this.$store.dispatch('mecha/getModelList', id).then((data) => {
        const placeData = []
        data.forEach(it => {
          placeData.push({
            label: it.std,
            value: it.id + ''
          })
        })
        StorageTableConfig.columns.forEach(it => {
          if (it.field === 'machineModelId') {
            it.options = placeData
          }
        })
        OutTableConfig.columns.forEach(it => {
          if (it.field === 'machineModelId') {
            it.options = placeData
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取设备列表
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['machineCode'],
        machineTypeId: this.machineTypeId
      }
      const query = Object.assign(this.listQuery, filter)
      getStorageList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          it.creditTime = parseTime(it.creditTime)
          it.outTime = parseTime(it.outTime)
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
        form: this.StorageTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.StorageTableConfig.columns
      })
      return editConfig
    },
    // 初始化出库窗口配置
    initOutConfig() {
      const outConfig = Object.assign({
        title: '设备出库',
        width: '1000px',
        form: this.OutTableConfig.columns
      })
      return outConfig
    },

    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 获取资产类型列表
      this.__updateRepairUnitTree()

      // 如果有数据，更新子组件的 formData
      if (row) {
        getStorageInfo(row.id).then(response => {
          const info = Object.assign(response.data, {
            machineTypeId: response.data.machineTypeId ? response.data.machineTypeId + '' : '',
            machineModelId: response.data.machineModelId ? response.data.machineModelId + '' : '',
            inBy: response.data.inBy ? response.data.inBy + '' : '',
            assetsType: response.data.assetsType ? response.data.assetsType + '' : '',
            outTime: parseTime(response.data.outTime),
            inTime: parseTime(response.data.inTime),
            creditTime: parseTime(response.data.creditTime)
          })
          // 获取设备类型下设备型号列表，更新config
          this.getModelList(response.data.machineTypeId)
          this.$refs[`${name}Dialog`].updataForm(info)
        })
      }
    },
    // 打开设备出库
    openOutDialog(row) {
      // 获取设备类型下设备型号列表，更新config
      this.getModelList(row.machineTypeId)
      // 获取领用单位列表
      this.__updatePickUnitTree()
      const info = {
        machineTypeId: row.machineTypeId + '',
        machineModelId: row.machineModelId + '',
        fixedAssetsCode: row.fixedAssetsCode
      }
      this.$refs.outDialog.updataForm(info)
      this.outDialogVisible = true
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
      this.$confirm('确定删除该设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStorage(row.id).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.changeCurrentPage(1)
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createStorage(query).then(response => {
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
      editStorage(query).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    // 设备出库
    outSubmit(submitData) {
      const query = Object.assign(submitData)
      createOutStorage(query).then(response => {
        this.outDialogVisible = false
        this.$message.success('出库成功')
        this.$refs.outDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.outDialog.resetSubmitBtn()
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
        this.$message.warning('请选择所删除的设备')
        return false
      }
      this.$confirm('确定删除所选中设备?', '提示', {
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
      this.machineTypeId = data.id
      this.queryData()
    }
  }
}
</script>
