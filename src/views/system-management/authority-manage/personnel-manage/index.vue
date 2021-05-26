<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" />

    <div class="tree-form-container">
      <div class="buttons">
        <div class="buttons_item">
          <el-button type="primary" size="medium" @click="createClick"><i class="el-icon-plus el-icon--left" />新建
          </el-button>
          <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="editClick('edit')"><i class="el-icon-edit el-icon--left" />编辑
          </el-button>
          <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deletePersonnel"><i class="el-icon-delete el-icon--left" />删除
          </el-button>
          <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
          <el-button type="primary" size="medium" plain @click="importClick"><i class="el-icon-top el-icon--left" />导入</el-button>
        </div>
        <div class="search">
          <el-input v-model="personnelSearch" size="medium" placeholder="人员姓名、身份证号" />
          <el-button type="primary" size="medium" @click="startSearch">搜索</el-button>
        </div>
      </div>
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="personnelConfig"
        @edit-click="(row) => openDialog('edit', row)"
        @submit-data="editSubmit"
        @selectionChange="selectionChange"
      />
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
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

      <!-- 上传附件弹窗-->
      <upload-file
        :dialog-visible="uploadDialogVisible"
        @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit"
      />
    </div>

  </div>
</template>

<script>
import { getUserList } from '@/api/authority-management'
import TreeBar from '@/components/TreeBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import { personnelConfig, OrganizationTree } from '@/data/authority-management'

export default {
  components: { TreeBar, ListTable, Pagination, FormDialog, UploadFile },
  data() {
    return {
      id: 'user-manage',
      list: [{
        deptName: '顾桥煤矿',
        identifier: '10001',
        personalName: '孙颖',
        IDNumber: '41272619961106331X',
        personalSex: 1,
        personalBirthdy: '1996.11.06',
        locationCardNumber: '412564236246489',
        personnelEducation: 2,
        phone: '18192816890',
        email: '17607461@qq.com',
        post: '科直',
        station: '开发',
        entryDate: '2021.03.22',
        nature: 1,
        level: 3,
        sort: '1',
        address: '上海闵行',
        remarks: '无'
      }, {
        deptName: '绞车一队队直',
        identifier: '10002',
        personalName: '李海',
        IDNumber: '340406198004134002',
        personalSex: 2,
        personalBirthdy: '1980.04.13',
        locationCardNumber: '412564236246489',
        personnelEducation: 1,
        phone: '18192816890',
        email: '17607461@qq.com',
        post: '科直',
        station: '开发',
        entryDate: '2021.03.22',
        nature: 2,
        level: 1,
        sort: '1',
        address: '上海闵行',
        remarks: '无'
      }, {
        deptName: '开拓二区201队队直',
        identifier: '10003',
        personalName: '姜旭',
        IDNumber: '304403197711040161X',
        personalSex: 2,
        personalBirthdy: '1977.11.04',
        locationCardNumber: '412564236246489',
        personnelEducation: 4,
        phone: '18192816890',
        email: '17607461@qq.com',
        post: '科直',
        station: '开发',
        entryDate: '2021.03.22',
        nature: 3,
        level: 3,
        sort: '1',
        address: '上海闵行',
        remarks: '无'
      }, {
        deptName: '开拓三区区直',
        identifier: '10004',
        personalName: '李宏友',
        IDNumber: '340821198004133412',
        personalSex: 2,
        personalBirthdy: '1996.11.06',
        locationCardNumber: '412564236246489',
        personnelEducation: 5,
        phone: '18192816890',
        email: '17607461@qq.com',
        post: '科直',
        station: '开发',
        entryDate: '2021.03.22',
        nature: 3,
        level: 1,
        sort: '1',
        address: '上海闵行',
        remarks: '无'
      }, {
        deptName: '开拓五区501队队直',
        identifier: '10005',
        personalName: '孙友群',
        IDNumber: '340421197308095413',
        personalSex: 2,
        personalBirthdy: '1973.08.09',
        locationCardNumber: '412564236246489',
        personnelEducation: 5,
        phone: '18192816890',
        email: '17607461@qq.com',
        post: '科直',
        station: '开发',
        entryDate: '2021.03.22',
        nature: 3,
        level: 1,
        sort: '1',
        address: '上海闵行',
        remarks: '无'
      }],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      personnelConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '选择组织结构',
        search: true,
        list: OrganizationTree
      },
      selectData: [],
      personnelSearch: '',
      updateDisabled: true,
      deleteDisabled: true,
      uploadDialogVisible: false
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      // this.listLoading = true
      // const query = Object.assign(this.listQuery, this.filter)
      // getUserList(query).then(response => {
      //   this.listLoading = false
      //   this.list = response.data.items
      //   this.total = response.data.total
      // })
      this.total = this.list.length
      this.listLoading = false
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
        form: this.personnelConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.personnelConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      }
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

    // 勾选checkbox触发
    selectionChange(_data) {
      this.selectData = _data
      if (_data.length > 0) {
        this.deleteDisabled = false
        if (_data.length == 1) {
          this.updateDisabled = false
        } else {
          this.updateDisabled = true
        }
      } else {
        this.deleteDisabled = true
      }
    },
    // 点击创建触发
    createClick() {
      this.createDialogVisible = true
    },
    // 点击编辑触发
    editClick() {
      if (this.selectData.length == 1) {
        // 如果有数据，更新子组件的 formData
        console.log(this.selectData)
        this.$refs.editDialog.updataForm(this.selectData[0])
      }
      this.editDialogVisible = true
    },
    // 点击删除触发
    deletePersonnel() {
      this.$message.success('删除成功')
    },
    // 点击同步触发
    synchroClick() {
      this.$message.success('同步成功')
    },
    // 点击导入触发
    importClick() {
      this.uploadDialogVisible = true
    },
    // 点击搜索触发
    startSearch() {
      if (this.personnelSearch) {
        this.$message.success('搜索成功')
      } else {
        this.$message.error('请输入搜索内容')
      }
    },
    // 上传文件点击确定触发
    uploadSubmit() {
      this.$message.success('导入成功')
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
        width: 240px;
      }

      .el-button {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
</style>
