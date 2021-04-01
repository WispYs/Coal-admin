<template>
  <div class="page-container">
    <div class="buttons" style="margin-bottom: 16px;">
      <div class="buttons_item">
        <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />创建
        </el-button>
        <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="openDialog('edit')"><i class="el-icon-edit el-icon--left" />编辑
        </el-button>
        <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deleteClick"><i class="el-icon-delete el-icon--left" />删除
        </el-button>
        <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
      </div>
    </div>

    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="NewsTypeConfig"
      @selectionChange="selectionChange"
      @addIco="(row) => openDialog('create', row)"
      @editIco="(row) => openDialog('edit', row)"
      @deleteIco="deleteClick"
    />

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="__fetchData" />

    <!-- 新建弹窗 -->
    <form-dialog
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
import {
  NewsTypeConfig
} from '@/data/authority-management'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
export default {
  components: {
    ListTable,
    Pagination,
    FormDialog
  },
  data() {
    return {
      id: 'message_type',
      listLoading: false,
      NewsTypeConfig,
      updateDisabled: true,
      deleteDisabled: true,
      deleteDisabled: true,
      selectData: [],
      createDialogVisible: false,
      editDialogVisible: false,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      list: [{
        ID: '1001',
        name: '协同办公',
        identifier: '010',
        newsLevel: 2,
        newsType: 2,
        targetType: 2,
        remindTarget: '测试',
        remark: '工作流服务产生的'
      }, {
        ID: '1002',
        name: '任务计划消息',
        identifier: '006',
        newsLevel: 1,
        newsType: 1,
        targetType: 1,
        remindTarget: '',
        remark: ''
      }, {
        ID: '1003',
        name: '预警报警',
        identifier: '001',
        newsLevel: 3,
        newsType: 3,
        targetType: 3,
        remindTarget: '',
        remark: '',
        children: [{
          ID: '10030',
          name: '系统报警',
          identifier: '001006',
          newsLevel: 1,
          newsType: 3,
          targetType: 2,
          remindTarget: '',
          remark: ''
        }, {
          ID: '10031',
          name: '管理预警',
          identifier: '001003',
          newsLevel: 1,
          newsType: 2,
          targetType: 3,
          remindTarget: '',
          remark: ''
        }]
      }, {
        ID: '1004',
        name: '监测预警',
        identifier: '005',
        newsLevel: 1,
        newsType: 2,
        targetType: 3,
        remindTarget: '测试2',
        remark: ''
      }]

    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = false
      this.total = this.list.length
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      console.log(row)
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      } else if (this.selectData.length == 1) {
        this.$refs.editDialog.updataForm(this.selectData[0])
      }
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '创建',
        width: '800px',
        form: this.NewsTypeConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.NewsTypeConfig.columns
      })
      return editConfig
    },
    // 点击删除触发
    deleteClick() {
      this.$message.success('删除成功')
    },
    // 点击同步触发
    synchroClick() {
      this.$message.success('同步成功')
    },
    // 点击表格checkbox时触发
    selectionChange(_data) {
      this.selectData = _data
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
        if (this.selectData.length == 1) {
          this.updateDisabled = false
        } else {
          this.updateDisabled = true
        }
      } else {
        this.deleteDisabled = true
        this.updateDisabled = true
      }
    },
    // submit data
    createSubmit(submitData) {
      this.createDialogVisible = false
      this.$message.success('新建成功')
    },
    editSubmit(submitData) {
      this.editDialogVisible = false
      this.$message.success('编辑成功')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
