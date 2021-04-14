<template>
  <div class="page-container">
    <filter-bar
      :config="MechLargeEquipTypeFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="MechLargeEquipTypeTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @other-click="detailDialogVisible = true"
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
    <!-- 展开详情 -->
    <detail-dialog
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
</template>

<script>
import { getLargeEquipmentType, createLargeEquipmentType, getLargeEquipmentTypeInfo, editLargeEquipmentType, getOrganTree, delLargeEquipmentType } from '@/api/mechatronics'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import DetailDialog from './components/DetailDialog'
import { MechLargeEquipTypeTableConfig, MechLargeEquipTypeFilterConfig, MechLargeEquipDetailFilterConfig, MechLargeEquipDetailTableConfig } from '@/data/mechatronics'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    DetailDialog
  },
  data() {
    return {
      id: 'organization-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      MechLargeEquipTypeTableConfig,
      MechLargeEquipTypeFilterConfig,
      MechLargeEquipDetailTableConfig,
      MechLargeEquipDetailFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      detailDialogVisible: false,
      createDetailDialogVisible: false,
      editDetailDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },
  created() {
    this.__fetchData()
  },

  methods: {
    // 接口获取组织机构树，更新config数据
    __updateOrganTree() {
      // getOrganTree().then(response => {
      //   MechLargeEquipTypeTableConfig.columns.forEach(it => {
      //     if (it.field === 'parentId') {
      //       it.options = response.data
      //     }
      //   })
      //   console.log(MechLargeEquipTypeTableConfig)
      // })
    },
    // 获取组织机构列表
    __fetchData() {
      this.listLoading = true
      // 初次加载只获取根节点数据
      const entity = {
        'parentId': 0
      }
      const filter = {
        ...this.filter,
        ...{ entity },
        keywordField: ['deptName', 'shortName']
      }
      const query = Object.assign(this.listQuery, filter)
      getLargeEquipmentType(query).then(response => {
        this.listLoading = false

        this.list = response.data.rows
        console.log(this.list)
        this.total = Number(response.data.records)
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
        width: '800px',
        form: this.MechLargeEquipTypeTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.MechLargeEquipTypeTableConfig.columns
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

      // 接口获取组织机构树，更新config数据
      this.__updateOrganTree()

      // 如果有数据，更新子组件的 formData
      if (row) {
        this.$refs[`${name}Dialog`].updataForm(row)
        getLargeEquipmentTypeInfo(row.sysDeptId).then(response => {
          const info = Object.assign(response.data)
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该类型吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delLargeEquipmentType(row.sysDeptId).then(response => {
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
      createLargeEquipmentType(query).then(response => {
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
      editLargeEquipmentType(query).then(response => {
        console.log(response)
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
    },
    // 详情新增
    createDetailSubmit(submitData) {
      console.log(submitData)

      const query = Object.assign(submitData, {

      })
      // createUser(query).then(response => {
      //   console.log(response)
      //   this.createDialogVisible = false
      //   this.$message.success('新建成功')
      //   this.$refs.createDialog.resetForm()
      //   this.__fetchData()
      // }).catch(err => {
      //   console.log(err)
      //   this.$refs.createDialog.resetSubmitBtn()
      // })
    },
    // 详情编辑
    editDetailSubmit(submitData) {
      const query = Object.assign(submitData)
      // editUser(query).then(response => {
      //   console.log(response)
      //   this.editDialogVisible = false
      //   this.$message.success('编辑成功')
      //   this.$refs.editDialog.resetForm()
      //   this.__fetchData()
      // })
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
        this.$message.warning('请选择所删除的类型')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        this.__fetchData()
        this.$message.success('删除成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
