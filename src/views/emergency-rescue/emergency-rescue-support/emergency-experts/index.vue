<template>
  <div class="page-container">
    <filter-bar
      :config="EmergencyExpertsFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <!-- 表格 -->
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="EmergencyExpertsTableConfig"
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

    <!-- 重置密码 -->
    <reset-password ref="resetPasswordDialog" :dialog-visible="passwordDialogVisible" @close-dialog="passwordDialogVisible = false" />

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
  getDictData,
  deleteBatches
} from '@/api/emergency-rescue'
import {
  EmergencyExpertsTableConfig,
  EmergencyExpertsFilterConfig
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
      id: 'emergency-experts',
      bussiness: 'yjjySpecialist',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      EmergencyExpertsFilterConfig,
      EmergencyExpertsTableConfig,
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
    this.__initOptions()
  },
  methods: {
    __initOptions() {
      // 模板管理
      getDictData(10028).then(res => {
        this.accidentType = res.data
        for (const k in res.data) {
          this.accidentType[k]['value'] = res.data[k]['dictName']
          this.accidentType[k]['label'] = res.data[k]['dictName']
        }
        EmergencyExpertsTableConfig.columns.forEach(it => {
          if (it.field === 'major') {
            it.options = res.data
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['specialistName', 'major']
      }
      const query = Object.assign(this.listQuery, filter)
      getObjectByPage(query, this.bussiness).then(response => {
        response.data.rows.forEach((r, idx) => {
          r.index = idx + 1
        })
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)

        if (this.listQuery.page > 1 && !this.list.length) {
          this.listQuery.page--
          this.__fetchData()
        }
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
        form: this.EmergencyExpertsTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.EmergencyExpertsTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 如果有数据，更新子组件的 formData
      if (row) {
        getObjectById(row[`${this.bussiness}Id`], this.bussiness).then(response => {
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
        delObject(row[`${this.bussiness}Id`], this.bussiness).then(response => {
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
      saveObject(submitData, this.bussiness).then(response => {
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
      updateObject(query, this.bussiness).then(response => {
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
      const arr = []
      this.multipleSelection.forEach(m => arr.push(m[`${this.bussiness}Id`]))
      if (arr.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatches(arr, this.bussiness).then(res => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
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
