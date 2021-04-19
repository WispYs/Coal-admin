<template>
  <div class="page-container">

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="EmergencyMedicalFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="EmergencyMedicalTableConfig"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @submit-data="editSubmit"
        @selection-change="selectionChange"
      />

      <div v-show="total>0" class="page-bottom">
        <!-- <el-button
          class="page-bottom__delete"
          type="warning"
          size="small"
          plain
          :disabled="deleteDisabled"
          @click="deleteBatches"
        >
          <i class="el-icon-delete el-icon--left" />批量删除
        </el-button> -->
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

      <!-- 重置密码 -->
      <reset-password ref="resetPasswordDialog" :dialog-visible="passwordDialogVisible" @close-dialog="passwordDialogVisible = false" />
    </div>

  </div>
</template>

<script>
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import ResetPassword from '@/components/ResetPassword'
import {
  getObjectByPage,
  saveObject,
  updateObject,
  delObject,
  getObjectById,
  getEmergencyCommunicationOrganizationTree
} from '@/api/emergency-rescue'
import {
  EmergencyMedicalTableConfig,
  EmergencyMedicalFilterConfig
} from '@/data/emergency-rescue-support'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    ResetPassword
  },
  data() {
    return {
      id: 'emergency-medical',
      business: 'yjjyMedical',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      EmergencyMedicalFilterConfig,
      EmergencyMedicalTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      passwordDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '应急通讯组织结构',
        list: []
      },
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__fetchData()
    // this.__updateOrganTree()
  },
  methods: {
    // 接口获取组织机构树
    // __updateOrganTree() {
    //   getEmergencyCommunicationOrganizationTree().then(response => {
    //     console.log(response.data)
    //     // 更新左侧树结构数据
    //     this.treeData.list = response.data
    //     // 更新新增、编辑config数据
    //     EmergencyMedicalTableConfig.columns.forEach(it => {
    //       if (it.field === 'yjjyCommunicationTissueId') {
    //         it.options = response.data
    //       }
    //     })
    //   })
    // },

    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['medicalUnit', 'userName']
      }
      const query = Object.assign(this.listQuery, filter)
      getObjectByPage(query, this.business).then(response => {
        response.data.rows.forEach((r, idx) => {
          r.index = idx + 1
        })
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
        form: this.EmergencyMedicalTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.EmergencyMedicalTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 如果有数据，更新子组件的 formData
      if (row) {
        getObjectById(row[`${this.business}Id`], this.business).then(response => {
          const res = response.data
          res.teamType = Number(res.teamType)
          // const info = Object.assign(response.data, {
          //   yjjyCommunicationTissueId: Number(response.data.yjjyCommunicationTissueId) || 0,
          //   sysRoleId: Number(response.data.sysRoleId) || 0
          // })
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObject(row[`${this.business}Id`], this.business).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      console.log(submitData)

      // const query = Object.assign(submitData, {
      //   sysRoleId: Number(submitData.sysRoleId) || 0,
      //   yjjyCommunicationTissueId: Number(submitData.yjjyCommunicationTissueId) || 0
      // })
      saveObject(submitData, this.business).then(response => {
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
    editSubmit(submitData) {
      const query = Object.assign(submitData)
      updateObject(query, this.business).then(response => {
        console.log(response)
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
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

    // 点击树形菜单时触发
    handleNodeClick(data) {
      console.log(data)
      const entity = {
        yjjyCommunicationTissueId: data.value
      }
      console.log(entity)
      this.filter = Object.assign(this.filter, { entity })
      this.__fetchData()
    }
  }
}
</script>
