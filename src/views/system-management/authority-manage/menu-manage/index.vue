<template>
  <div class="page-container">
    <div class="filter-contral">
      <filter-bar :config="MenuFilterConfig" @search-click="queryData" @create-click="openDialog('create')"/>
    </div>
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="operationAction"
      height="calc(100% - 157px)"
      @addIco="(row) => openDialog('create', row)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @selection-change="selectionChange"
      @other-click="otherClick"
    />
    <div v-show="total>0" class="page-bottom">
      <!-- <el-button
        class="page-bottom__delete"
        type="warning"
        size="small"
        plain
        :disabled="deleteDisabled"
        @click="deleteClick"
      >
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button> -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="pagination"
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
    <operation-mange ref="operationDialog" :dialog-visible="operationDialogVisible" :config="initOperationConfig()" @close-dialog="operationDialogVisible = false" @open-dialog="openDialog"></operation-mange>
  </div>
</template>

<script>
import {
  getApplicationList,
  getMenuList,
  deleteMenuById,
  getMenuOrButtonMenuList,
  saveMenu,
  getMenuById,
  updateMenu
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import OperationMange from './components/operationMange/index.vue'
import {
  menuResourceConfig,
  MenuFilterConfig,
  menuResourButtonConfig,
  menuResourButtonFilterConfig
} from '@/data/authority-management'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    OperationMange
  },
  data() {
    return {
      id: 'application-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      menuResourceConfig,
      MenuFilterConfig,
      menuResourButtonConfig,
      menuResourButtonFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      operationDialogVisible: false,
      list: [],
      deleteDisabled: true,
      selectData: [],
      operationAction:{}
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData(_filter) {
      this.listLoading = true
      const query = {
        sort: {
          asc: ['sort']
        },
        entity:{
          type: 0
        },
        keyword: _filter,
        keywordField: ['menuName'],
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows
      }
      getMenuList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.operationAction.actions= []
          // let aaa = []
          // this.menuResourceConfig.actions.forEach(it=>{
          //   aaa.push(it)
          // })
          this.operationAction.actions = JSON.parse(JSON.stringify(this.menuResourceConfig.actions));
          this.operationAction.columns = this.menuResourceConfig.columns
          this.operationAction.otherActionTitle = this.menuResourceConfig.otherActionTitle
          // response.data.rows.forEach(it =>{
          //   if(!it.path){
          //     for(let b in this.operationAction.actions){
          //       if(this.operationAction.actions[b] == 'other'){
          //         this.operationAction.actions.splice(b,1)
          //       }
          //     }
          //     // console.log(this.operationAction.actions);
          //   }else{
          //     this.operationAction.actions = JSON.parse(JSON.stringify(this.menuResourceConfig.actions))
          //   }
          //   console.log(this.operationAction.actions);
          // })
          this.list = response.data.rows
          this.total = Number(response.data.records)
        } else {
          if (this.listQuery.page > 0) {
            this.listQuery.page = this.listQuery.page - 1
            this.__fetchData()
          } else {
            this.listLoading = false
            this.list = []
            this.total = 0
          }
        }
      }).catch(err => {
        this.listLoading = false
      })
    },
    // 查询数据
    queryData(filter) {
      this.__fetchData(filter.keyword)
    },
    pagination(val) {
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '创建菜单',
        width: '1000px',
        form: this.menuResourceConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.menuResourceConfig.columns
      })
      return editConfig
    },
    // 初始化详情窗口配置
    initOperationConfig() {
      const createConfig = Object.assign({
        title: '按钮管理',
        width: '1000px',
        filter: this.menuResourButtonFilterConfig,
        form: this.menuResourButtonConfig
      })
      return createConfig
    },
    // 接口获取组织机构树，更新config数据
    __updateMenuTree() {
      const query = {
        parentId: Number(0),
        type: Number(0)
      }
      getMenuOrButtonMenuList(query).then(response => {
        this.menuResourceConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
        console.log(response.data);
        this.menuResourButtonConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
      })
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      // 接口获取组织机构树，更新config数据
      this.__updateMenuTree()
      if (row) {
        // 如果有数据，更新子组件的 formData
        getMenuById(row.sysMenuId).then(response => {
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenuById(row.sysMenuId).then(response =>{
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        sort: Number(submitData.sort) || 0,
        parentId: Number(submitData.parentId) || 0
      })
      saveMenu(query).then(response => {
        this.__fetchData()
        this.createDialogVisible = false
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateMenu(submitData).then(response => {
        this.__fetchData()
        this.editDialogVisible = false
        this.$refs.editDialog.resetForm()
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    // 点击表格checkbox框触发
    selectionChange(row) {
      this.selectData = row
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
    },
    otherClick(data,rows,operation){
      console.log(data,rows,operation);
      if(data.type == 1){
        this.$message.info('该数据为按钮')
        return
      }
      if(operation == '按钮管理'){
        this.operationDialogVisible = true
        this.$refs.operationDialog.updata(data.sysMenuId)
      }
    }
  }
}
</script>
