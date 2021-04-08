<template>
  <div class="page-container">
    <!-- <div class="buttons">
      <div class="buttons_item">
        <el-button type="primary" size="medium" @click="openDialog('menuType')"><i class="el-icon-plus el-icon--left" />新建
        </el-button>
        <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="openDialog('edit')"><i class="el-icon-edit el-icon--left" />编辑
        </el-button>
        <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deleteClick"><i class="el-icon-delete el-icon--left" />删除
        </el-button>
        <el-button type="warning" size="medium" plain :disabled="moveUpDisabled" @click="moveUpClick"><i class="el-icon-top el-icon--left" />上移</el-button>
        <el-button type="info" size="medium" plain :disabled="moveDownDisabled" @click="moveDownClick"><i class="el-icon-bottom el-icon--left" />下移</el-button>
        <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
      </div>
      <div class="search">
        <el-input v-model="menuSearch" size="medium" placeholder="名称、值" />
        <el-button type="primary" size="medium" @click="queryData(menuSearch)">搜索</el-button>
      </div>
    </div> -->
    <filter-bar
      :config="MenuFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('menuType')"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="menuResourceConfig"
      height="calc(100% - 157px)"
      @addIco="(row) => openDialog('create', row)"
      @editIco="(row) => openDialog('edit', row)"
      @deleteIco="deleteClick"
      @moveUpIco="moveUpClick"
      @moveDownIco="moveDownClick"
      @selection-change="selectionChange"
    />
    <div v-show="total>0" class="page-bottom">
      <el-button
        class="page-bottom__delete"
        type="warning"
        size="small"
        plain
        :disabled="deleteDisabled"
        @click="deleteClick"
      >
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="__fetchData" />
    </div>

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
    <menu-type-dialog
      :config="initMenuConfig()"
      :dialog-visible="menuTypeDialogVisible"
      @menuClick="menuClick"
      @closeDialog="menuTypeDialogVisible = false"
    />
  </div>
</template>

<script>
import {
  getApplicationList,
  getMenuList,
  deleteMenuById
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import MenuTypeDialog from './conponments/menu-type-dialog/index.vue'
import {
  menuResourceConfig,
  FilterConfig,
  MenuFilterConfig,
  menuResourceModuleConfig,
  menuResourcePageConfig,
  menuResourceUploadPageConfig
} from '@/data/authority-management'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    MenuTypeDialog
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
      FilterConfig,
      menuResourceConfig,
      MenuFilterConfig,
      menuResourceModuleConfig,
      menuResourcePageConfig,
      menuResourceUploadPageConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      list:[],
      updateDisabled: true,
      deleteDisabled: true,
      moveUpDisabled: true,
      moveDownDisabled: true,
      menuSearch: '',
      menuTypeDialogVisible: false,
      menuName: '',
      menuType: '',
      selectData: []
    }
  },

  created() {
    this.__fetchData()
    console.log(this.MenuFilterConfig);
  },
  methods: {
    __fetchData(_filter) {
      this.listLoading = true
      let query={
        entity:{
          menuName: _filter
        },
        sort:{
          asc:["sort"]
        },
        page:this.listQuery.page,
        pagerows: this.listQuery.pagerows
      }
      getMenuList(query).then(response => {
        console.log(response);
        this.list = response.data.rows
        this.total = Number(response.data.records)
        this.listLoading = false
      })
    },
    // 查询数据
    queryData(filter) {
      console.log(filter);
      if (filter) {
        // this.filter = Object.assign(this.filter, filter)
        this.__fetchData(filter.keyword)
      } else {
        this.$message.error('请输入搜索内容')
      }
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      let configFrom = []
      if(this.menuType == "page"){
        configFrom = this.menuResourcePageConfig.columns
      }else if(this.menuType == "module"){
        configFrom = this.menuResourceModuleConfig.columns
      }else if(this.menuType == "uploadPage"){
        configFrom = this.menuResourceUploadPageConfig.columns
      }
      const createConfig = Object.assign({
        title: this.menuName,
        width: '800px',
        form: configFrom
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.menuResourceConfig.columns
      })
      return editConfig
    },
    // 初始化展示选择哪种类型的菜单
    initMenuConfig() {
      const createConfig = Object.assign({
        title: '你要添加哪种类型的菜单？',
        width: '500px',
        form: this.menuResourceConfig.columns
      })
      return createConfig
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
        deleteMenuById(id).then(response => {
          this.$message.success('删除成功')
        })
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
    // 点击上移触发
    moveUpClick() {
      this.$message.success('上移成功')
    },
    // 点击下移触发
    moveDownClick() {
      this.$message.success('下移成功')
    },
    // 点击同步触发
    synchroClick() {
      this.$message.success('同步成功')
    },
    // 点击表格checkbox框触发
    selectionChange(row) {
      this.selectData = row
      console.log(this.selectData);
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
    },
    // 点击模块、页面、上传页面触发
    menuClick(_row) {
      console.log(_row)
      if (_row == 'module') {
        this.menuName = '模块组'
        this.menuType = "module"
      } else if (_row == 'page') {
        this.menuName = '菜单'
        this.menuType = 'page'
      } else if (_row == 'uploadPage') {
        this.menuName = '上传页面'
        this.menuType = 'uploadPage'
      }
      this.menuTypeDialogVisible = false
      this.createDialogVisible = true
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
