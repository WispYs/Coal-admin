<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :has-menu="hasMenu" :tree-data="treeData" :menu-config="menuConfig" @handleNodeClick="handleNodeClick" />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="MechLargeEquipFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="MechLargeEquipTableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @other-click="(row) => openDetailDialog(row.area)"
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
        @upload-click="openUploadDialog"
        @close-dialog="createDialogVisible = false"
        @submit="createSubmit"
      />
      <!-- 编辑弹窗 -->
      <form-dialog
        ref="editDialog"
        :config="initEditConfig()"
        :dialog-visible="editDialogVisible"
        @upload-click="openUploadDialog"
        @close-dialog="editDialogVisible = false"
        @submit="editSubmit"
      />
      <!-- 上传附件 -->
      <upload-file
        :dialog-visible="uploadDialogVisible"
        :multiple="false"
        @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit"
      />

      <!-- 展开详情 -->
      <detail-dialog
        ref="detailDialog"
        :config="initDetailConfig()"
        :dialog-visible="detailDialogVisible"
        @close-dialog="detailDialogVisible = false"
        @open-dialog="openDialog"
      />

      <!-- 详情新建弹窗 -->
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

  </div>
</template>

<script>
import {
  getLargeEquipmentList,
  createLargeEquipment,
  getLargeEquipmentInfo,
  editLargeEquipment,
  delLargeEquipment,
  getEquipmentAreaList,
  getEquipmentAreaInfo,
  createEquipmentArea,
  editEquipmentArea
} from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import DetailDialog from './components/DetailDialog'
import { parseTime } from '@/utils'
import { MechLargeEquipTableConfig, MechLargeEquipFilterConfig, MechLargeEquipDetailFilterConfig, MechLargeEquipDetailTableConfig } from '@/data/mechatronics'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile,
    DetailDialog
  },
  data() {
    return {
      id: 'large-equipment-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      MechLargeEquipFilterConfig,
      MechLargeEquipTableConfig,
      MechLargeEquipDetailTableConfig,
      MechLargeEquipDetailFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      detailDialogVisible: false, // 特有属性详情
      createDetailDialogVisible: false,
      editDetailDialogVisible: false,
      treeExtend: true,
      hasMenu: true,
      treeData: {
        title: '',
        list: []
      },
      // tree右键菜单配置
      menuConfig: [
        {
          menuName: '详情',
          fn: this.treeDetail,
          flag: true
        }
      ],
      uploadRow: null, // 上传文件信息
      uploadDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__fetchData()
    this.__updateEquipAreaTree()
  },
  methods: {
    // 接口获取所属场所
    __updateEquipAreaTree() {
      // getEquipmentAreaList().then(response => {
      //   console.log(response.data)
      //   // 更新左侧树结构数据
      //   this.treeData.list = response.data
      //   // 更新新增、编辑config数据
      //   const areaData = []
      //   response.data.forEach(it => {
      //     areaData.push({
      //       label: it.label,
      //       value: Number(it.value)
      //     })
      //   })
      //   MechLargeEquipTableConfig.columns.forEach(it => {
      //     if (it.field === 'area') {
      //       it.options = areaData
      //     }
      //   })
      // })
    },

    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['workNumber', 'loginName', 'userName']
      }
      const query = Object.assign(this.listQuery, filter)
      getLargeEquipmentList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          it.arrivalTime = parseTime(it.arrivalTime)
          it.outFacTime = parseTime(it.outFacTime)
          it.useTime = parseTime(it.useTime)
        })
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    // 点击treeBar详情
    treeDetail(tag) {
      console.log(tag)
      // 只有第一级的树型结构才有详情
      if (tag.level === 1) {
        const tagId = tag.data.value
        this.openDetailDialog(tagId)
        this.detailDialogVisible = true
      } else {
        this.$message({
          message: '只有所属场所具备特有属性',
          type: 'warning'
        })
      }
    },

    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '800px',
        form: this.MechLargeEquipTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.MechLargeEquipTableConfig.columns
      })
      return editConfig
    },
    // 初始化详情窗口配置
    initDetailConfig() {
      const createConfig = Object.assign({
        title: '详情',
        width: '800px',
        filter: this.MechLargeEquipDetailFilterConfig,
        form: this.MechLargeEquipDetailTableConfig
      })
      return createConfig
    },
    // 初始化新建窗口配置
    initCreateDetailConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '800px',
        form: this.MechLargeEquipDetailTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditDetailConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.MechLargeEquipDetailTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      let getListFn = null // 获取详情的接口方法
      // 如果打开特有属性的新增编辑弹窗
      if (name.indexOf('Detail') > -1) {
        getListFn = getEquipmentAreaInfo
      } else {
        // 接口获取所属场所，更新config数据
        this.__updateEquipAreaTree()
        getListFn = getLargeEquipmentInfo
      }

      // 如果有数据，更新子组件的 formData
      if (row) {
        getListFn(row.id).then(response => {
          const info = Object.assign(response.data, {
            arrivalTime: parseTime(response.data.arrivalTime),
            outFacTime: parseTime(response.data.outFacTime),
            useTime: parseTime(response.data.useTime)
          })
          this.$refs[`${name}Dialog`].updataForm(info)
        })
      }
    },
    // 打开特有属性弹窗
    openDetailDialog(id) {
      console.log(id)
      this.detailDialogVisible = true
      this.$refs.detailDialog.queryData({ id })
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delLargeEquipment(row.id).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      console.log(submitData)

      const query = Object.assign(submitData)
      createLargeEquipment(query).then(response => {
        console.log(response)
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
      editLargeEquipment(query).then(response => {
        console.log(response)
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
    },
    // 打开上传文件组件
    openUploadDialog(row) {
      this.uploadDialogVisible = true
      this.uploadRow = row
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      console.log(fileList)
      this.uploadDialogVisible = false
    },
    // 详情新增
    createDetailSubmit(submitData) {
      console.log(submitData)

      const query = Object.assign(submitData)
      createEquipmentArea(query).then(response => {
        console.log(response)
        this.createDetailDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDetailDialog.resetForm()
        this.$refs.detailDialog.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDetailDialog.resetSubmitBtn()
      })
    },
    // 详情编辑
    editDetailSubmit(submitData) {
      const query = Object.assign(submitData)
      editEquipmentArea(query).then(response => {
        console.log(response)
        this.editDetailDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDetailDialog.resetForm()
        this.$refs.detailDialog.__fetchData()
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
        this.__fetchData()
        this.$message.success('删除成功')
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      console.log(data)
      const entity = {
        part: data.value
      }
      console.log(entity)
      this.filter = Object.assign(this.filter, { entity })
      this.__fetchData()
    }
  }
}
</script>
