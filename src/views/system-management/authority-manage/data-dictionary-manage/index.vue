<template>
  <div class="page-container">
    <div class="buttons">
      <div class="buttons_item">
        <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />创建
        </el-button>
        <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="openDialog('edit')"><i class="el-icon-edit el-icon--left" />编辑
        </el-button>
        <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deleteClick"><i class="el-icon-delete el-icon--left" />删除
        </el-button>
        <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
      </div>
      <div class="search">
        <el-input v-model="dataDictionary" size="medium" placeholder="名称、值" />
        <el-button type="primary" size="medium" @click="queryData(dataDictionary)">搜索</el-button>
      </div>
    </div>

    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="dataDictionaryConfig"
      @addIco="(row) => openDialog('create', row)"
      @editIco="(row) => openDialog('edit', row)"
      @deleteIco="deleteClick"
      @selectionChange="selectionChange"
    />

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="__fetchData" />

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
  getApplicationList
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { dataDictionaryConfig } from '@/data/authority-management'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
  },
  data() {
    return {
      id: 'application-manage',
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      dataDictionaryConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      list: [{
        id: '001',
        name: '组织机构类型',
        identifier: '001',
        value: '',
        sort: 1,
        type: 2,
        remark: '组织机构类型',
        children: [{
          id: '001001',
          name: '集团公司',
          identifier: '001001',
          value: '',
          sort: 2,
          type: 1,
          remark: '无'
        }, {
          id: '001002',
          name: '二级公司',
          identifier: '001002',
          value: '',
          sort: 3,
          type: 1,
          remark: '无'
        }]
      }, {
        id: '002',
        name: '数据权限类型',
        identifier: '002',
        value: '',
        sort: 2,
        type: 2,
        remark: '数据权限类型'
      }, {
        id: '003',
        name: '责任追究类型',
        identifier: '003',
        value: '',
        sort: 3,
        type: 2,
        remark: '责任追究类型',
        children: [{
          id: '003001',
          name: '罚款',
          identifier: '003001',
          value: '',
          sort: 2,
          type: 1,
          remark: '无',
          children: [{
            id: '003001001',
            name: '约谈',
            identifier: '003001001',
            value: '',
            sort: 3,
            type: 1,
            remark: '无'
          }]
        }]
      }],
      updateDisabled: true,
      deleteDisabled: true,
      dataDictionary: '',
      selectData: []
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      // this.listLoading = true
      // const query = Object.assign(this.listQuery, this.filter)
      // getApplicationList(query).then(response => {
      //   this.listLoading = false
      //   this.list = response.data.items
      //   this.total = response.data.total
      // })
      this.listLoading = false
      this.total = this.list.length
    },
    // 查询数据
    queryData(filter) {
      if (filter) {
        this.filter = Object.assign(this.filter, filter)
        this.$message.success('查询成功')
        this.__fetchData()
      } else {
        this.$message.error('请输入搜索内容')
      }
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '创建',
        width: '800px',
        form: this.dataDictionaryConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.dataDictionaryConfig.columns
      })
      return editConfig
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
    // 删除
    deleteClick(id) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      })
    },
    // submit data
    createSubmit(submitData) {
      console.log(submitData)
      this.createDialogVisible = false
      this.$message.success('新建成功')
    },
    editSubmit(submitData) {
      console.log(submitData)
      this.editDialogVisible = false
      this.$message.success('编辑成功')
    },
    // 点击同步触发
    synchroClick() {
      this.$message.success('同步成功')
    },
    // 点击表格checkbox框触发
    selectionChange(row) {
      this.selectData = row
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
        if (this.selectData.length == 1) {
          this.updateDisabled = false
          this.moveUpDisabled = false
          this.moveDownDisabled = false
        } else {
          this.updateDisabled = true
          this.moveUpDisabled = true
          this.moveDownDisabled = true
        }
      } else {
        this.deleteDisabled = true
        this.updateDisabled = true
        this.moveUpDisabled = true
        this.moveDownDisabled = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .buttons {
    margin-bottom: 16px;

    .buttons_item {
      display: inline-block;
    }

    .search {
      display: inline-block;
      float: right;

      .el-input {
        display: inline-block;
        width: 200px;
      }

      .el-button {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
</style>
