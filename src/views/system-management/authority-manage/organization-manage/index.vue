<template>
  <div class="page-container">
    <!-- <filter-bar
      :config="OrganFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
      @export-click="handelExport"
    /> -->
    <div class="buttons">
      <div class="buttons_item">
        <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />新建
        </el-button>
        <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="editClick('edit')"><i class="el-icon-edit el-icon--left" />编辑
        </el-button>
        <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deletePersonnel"><i class="el-icon-delete el-icon--left" />删除
        </el-button>
        <el-button type="warning" size="medium" plain :disabled="moveUpDisabled" @click="moveUpClick"><i class="el-icon-top el-icon--left" />上移</el-button>
        <el-button type="info" size="medium" plain :disabled="moveDownDisabled" @click="moveDownClick"><i class="el-icon-top el-icon--left" />下移</el-button>
        <el-button type="danger" size="medium" plain @click="handelExport"><i class="el-icon-top el-icon--left" />导出</el-button>
        <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>

      </div>
      <div class="search">
        <el-input v-model="institutionSearch" size="medium" placeholder="名称、简称"></el-input>
        <el-button type="primary" size="medium" @click="queryData">搜索</el-button>
      </div>
    </div>
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="OrganTableConfig"
      @load-tree-data="asyncData"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selectionChange="selectionChange"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
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

  </div>
</template>

<script>
import { getOrganList } from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { OrganTableConfig, OrganFilterConfig } from '@/data/authority-management'
import exportExcel from '@/utils/export-excel'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog },
  data() {
    return {
      id: 'organization-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      OrganFilterConfig,
      OrganTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      updateDisabled: true,
      deleteDisabled: true,
      institutionSearch:'',
      moveUpDisabled: true,
      moveDownDisabled: true,
      selectData:[]
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const query = Object.assign(this.listQuery, this.filter)
      getOrganList(query).then(response => {
        this.listLoading = false
        this.list = response.data.items
        this.total = response.data.total
      })
    },

    // 异步获取树子节点数据
    asyncData(tree, treeNode, resolve) {
      console.log(tree, treeNode, resolve)
      setTimeout(() => {
        resolve([
          {
            name: '矿领导',
            num: '001010',
            abbreviation: '矿领导',
            type: 3,
            sort: 2,
            createDate: '2020.07.21'
          }, {
            name: '办公室',
            num: '001012',
            abbreviation: '办公室',
            type: 2,
            sort: 186,
            createDate: '2020.12.19'
          }
        ])
      }, 1000)
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
        width: '500px',
        form: this.OrganTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '500px',
        form: this.OrganTableConfig.columns
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
    // 删除
    deleteClick(id) {
      this.$ceditClickonfirm('确定删除该站点?', '提示', {
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
    // 定义导出Excel表格事件
    handelExport() {
      // 第一个参数为 table 的 id
      // 第二个参数为导出文件的 name
      exportExcel(this.id, '组织机构管理')
    },
    editClick(){

    },
    deletePersonnel(){
      this.$message.success('删除成功')
    },
    synchroClick(){

    },
    moveUpClick(){

    },
    moveDownClick(){

    },
    selectionChange(_data){
      this.selectData = _data;
      console.log(_data);
      if(this.selectData.length > 0){
        this.deleteDisabled= false;
        if(this.selectData.length == 1){
          this.updateDisabled = false;
          this.moveDownDisabled = false;
          this.moveUpDisabled = false;
        }else{
          this.updateDisabled = true;
          this.moveDownDisabled = true;
          this.moveUpDisabled = true;
        }
      }else{
        this.deleteDisabled = true;
        this.updateDisabled = true;
        this.moveDownDisabled = true;
        this.moveUpDisabled = true;
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
