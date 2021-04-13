<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @handleNodeClick="handleNodeClick" />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="SparePartFilterConfig"
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
        :config="SparePartTableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @other-click="otherClick"
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
      <!-- 领用 -->
      <form-dialog
        ref="receiveDialog"
        :config="initReceiveConfig()"
        :dialog-visible="receiveDialogVisible"
        @close-dialog="receiveDialogVisible = false"
        @submit="receiveSubmit"
      />
      <!-- 入库 -->
      <form-dialog
        ref="storeDialog"
        :config="initStoreConfig()"
        :dialog-visible="storeDialogVisible"
        @close-dialog="storeDialogVisible = false"
        @submit="storeSubmit"
      />
      <!-- 明细 -->
      <detail-dialog
        ref="detailDialog"
        :dialog-visible="detailDialogVisible"
        @close-dialog="detailDialogVisible = false"
      />

    </div>

  </div>
</template>

<script>
import { getSparePartList, createUser, getUserInfo, editUser, delUser, getEquipmentArea } from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { SparePartTableConfig, SparePartFilterConfig, ReceiveTableConfig, StoreTableConfig, DetailTableConfig } from '@/data/mechatronics'
import DetailDialog from './components/DetailDialog'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    DetailDialog
  },
  data() {
    return {
      id: 'spare-parts',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      SparePartFilterConfig,
      SparePartTableConfig,
      ReceiveTableConfig,
      StoreTableConfig,
      DetailTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      receiveDialogVisible: false, // 领用
      storeDialogVisible: false, // 入库
      detailDialogVisible: false, // 明细
      treeExtend: true,
      treeData: {
        title: '',
        list: [
          {
            value: 0,
            label: '全部',
            children: [{ value: 1, label: '主井' }, { value: 2, label: '副井' }]
          }
        ]
      },
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['workNumber', 'loginName', 'userName']
      }
      const query = Object.assign(this.listQuery, filter)
      getSparePartList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
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
        form: this.SparePartTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.SparePartTableConfig.columns
      })
      return editConfig
    },
    // 初始化领用窗口配置
    initReceiveConfig() {
      const receiveConfig = Object.assign({
        title: '领用',
        width: '800px',
        form: this.ReceiveTableConfig.columns
      })
      return receiveConfig
    },
    // 初始化入库窗口配置
    initStoreConfig() {
      const storeConfig = Object.assign({
        title: '入库',
        width: '800px',
        form: this.StoreTableConfig.columns
      })
      return storeConfig
    },
    // 初始化明细窗口配置
    initDetailConfig() {
      const detailConfig = Object.assign({
        title: '明细',
        width: '800px',
        form: this.DetailTableConfig.columns
      })
      return detailConfig
    },

    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 如果有数据，更新子组件的 formData
      if (row) {
        this.$refs[`${name}Dialog`].updataForm(row)
        // getUserInfo(row.sysUserId).then(response => {
        //   const info = Object.assign(response.data, {
        //     sysDeptId: Number(response.data.sysDeptId) || 0,
        //     sysRoleId: Number(response.data.sysRoleId) || 0
        //   })
        //   this.$refs.editDialog.updataForm(info)
        // })
      }
    },
    // 领用，入库，明细按钮
    otherClick(row, index, item) {
      if (item === '领用') {
        this.receiveDialogVisible = true
      } else if (item === '入库') {
        this.storeDialogVisible = true
      } else if (item === '明细') {
        this.detailDialogVisible = true
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.sysUserId)
        delUser(row.sysUserId).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      console.log(submitData)

      const query = Object.assign(submitData, {
        sysRoleId: Number(submitData.sysRoleId) || 0,
        sysDeptId: Number(submitData.sysDeptId) || 0
      })
      createUser(query).then(response => {
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
      editUser(query).then(response => {
        console.log(response)
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
    },
    // 领用
    receiveSubmit(submitData) {
      const query = Object.assign(submitData)
      editUser(query).then(response => {
        console.log(response)
        this.receiveDialogVisible = false
        this.$message.success('领用成功')
        this.$refs.receiveDialog.resetForm()
        this.__fetchData()
      })
    },
    // 入库
    storeSubmit(submitData) {
      const query = Object.assign(submitData)
      editUser(query).then(response => {
        console.log(response)
        this.storeDialogVisible = false
        this.$message.success('入库成功')
        this.$refs.storeDialog.resetForm()
        this.__fetchData()
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
        this.$message.warning('请选择所删除的项')
        return false
      }
      this.$confirm('确定删除所选中项?', '提示', {
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
        sysDeptId: data.value
      }
      console.log(entity)
      this.filter = Object.assign(this.filter, { entity })
      this.__fetchData()
    }
  }
}
</script>
