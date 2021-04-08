<template>
  <div class="page-container report-table">

    <filter-bar
      :config="FlowFilterConfig"
      @create-click="openDialog('create')"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="flowTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
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

  </div>
</template>

<script>
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import FilterBar from '@/components/FilterBar'
import { flowTableConfig, FlowFilterConfig } from '@/data/flow-management'
import { getApplicationList } from '@/api/flow-management'
export default {
  components: { ListTable, Pagination, FormDialog, FilterBar },
  data() {
    return {
      editDialogVisible: false,
      createDialogVisible: false,
      flowTableConfig,
      FlowFilterConfig,
      id: 'flow-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      listLoading: true,
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
      const query = Object.assign(this.listQuery)
      this.listLoading = false
      this.list = []
      // getApplicationList(query).then(response => {
      //   this.listLoading = false
      //   this.list = response.data.rows
      //   this.total = Number(response.data.records)
      // })
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '800px',
        form: this.flowTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.flowTableConfig.columns
      })
      return editConfig
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.sysManageId)
        // delApplication(row.sysManageId).then(response => {
        //   console.log(response)
        //   this.$message.success('删除成功')
        //   this.__fetchData()
        // })
      })
    },
    // 编辑
    editSubmit(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0
      })
      // editApplication(query).then(response => {
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
        this.$message.warning('请选择所删除的文件')
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
    },
    // 新建
    createSubmit(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0,
        sysDeptId: Number(submitData.sysDeptId) || 0
      })
      // createApplication(query).then(response => {
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

    // 打开弹窗
    openDialog(name, row) {
      console.log(name, row)
      const visible = `${name}DialogVisible`
      this[visible] = true
      // getOrganTree().then(response => {
      //   console.log(response.data)
      //   // 更新新增、编辑config数据
      //   flowTableConfig.columns.forEach(it => {
      //     if (it.field === 'sysDeptId') {
      //       it.options = response.data
      //     }
      //   })
      // })
      // // 如果有数据，更新子组件的 formData
      // if (row) {
      //   getApplicationInfo(row.sysManageId).then(response => {
      //     const info = Object.assign(response.data, {
      //       sysDeptId: Number(response.data.sysDeptId) || 0
      //     })
      //     this.$refs.editDialog.updataForm(info)
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.configForm{
  width: 100%;
}
</style>
