<template>
  <div class="page-container">
    <div class="buttons">
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
    </div>
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="menuResourceConfig"
      @addIco="(row) => openDialog('create', row)"
      @editIco="(row) => openDialog('edit', row)"
      @deleteIco="deleteClick"
      @moveUpIco="moveUpClick"
      @moveDownIco="moveDownClick"
      @selectionChange="selectionChange"
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
  getApplicationList
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import MenuTypeDialog from './conponments/menu-type-dialog/index.vue'
import {
  menuResourceConfig,
  FilterConfig
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
      createDialogVisible: false,
      editDialogVisible: false,
      list: [{
        id: '1001',
        name: '门户页面子系统权限',
        identifier: '033004002001',
        type: '模块',
        clientType: 2,
        show: 2,
        state: 1,
        adress: '/menuMange',
        openType: 1,
        dataRange: 4,
        source: 5,
        sort: 1,
        remark: '无',
        children: [{
          id: '10010',
          name: '智慧安监',
          identifier: '033004002001',
          type: '模块',
          clientType: 2,
          show: 2,
          state: 1,
          adress: '/menuMange',
          openType: 1,
          dataRange: 4,
          source: 5,
          sort: 1,
          remark: '无'
        }, {
          id: '10011',
          name: '调度查询',
          identifier: '0330040020011',
          type: '模块',
          clientType: 1,
          show: 2,
          state: 1,
          adress: '/menuMange',
          openType: 1,
          dataRange: 2,
          source: 4,
          sort: 1,
          remark: '无'
        }]
      }, {
        id: '1002',
        name: '全息一张图',
        identifier: '033004002002',
        type: '菜单',
        clientType: 1,
        show: 1,
        state: 2,
        adress: '/menuMange',
        openType: 2,
        dataRange: 2,
        source: 3,
        sort: 2,
        remark: '无'
      }, {
        id: '1003',
        name: '设备检修',
        identifier: '033004002003',
        type: '模块',
        clientType: 2,
        show: 1,
        state: 2,
        adress: '/menuMange',
        openType: 1,
        dataRange: 4,
        source: 4,
        sort: 3,
        remark: '无',
        children: [{
          id: '10030',
          name: '检修计划',
          identifier: '0330040020030',
          type: '菜单',
          clientType: 2,
          show: 1,
          state: 2,
          adress: '/menuMange',
          openType: 2,
          dataRange: 2,
          source: 2,
          sort: 30,
          remark: '无',
          children: [{
            id: '100300',
            name: '维修任务',
            identifier: '03300400200300',
            type: '页面',
            clientType: 2,
            show: 1,
            state: 2,
            adress: '/menuMange',
            openType: 1,
            dataRange: 4,
            source: 5,
            sort: 300,
            remark: '无'
          }]
        }]
      }],
      updateDisabled: true,
      deleteDisabled: true,
      moveUpDisabled: true,
      moveDownDisabled: true,
      menuSearch: '',
      menuTypeDialogVisible: false,
      menuName: '',
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
        this.__fetchData()
      } else {
        this.$message.error('请输入搜索内容')
      }
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: this.menuName,
        width: '800px',
        form: this.menuResourceConfig.columns
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
      } else if (_row == 'page') {
        this.menuName = '菜单'
      } else if (_row == 'uploadPage') {
        this.menuName = '上传页面'
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
