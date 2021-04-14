<template>
  <div class="page-container">
    <filter-bar
      :config="MenuFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
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
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="pagination" />
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
  </div>
</template>

<script>
import {
  getApplicationList,
  getMenuList,
  deleteMenuById,
  getMenuOrButtonList,
  saveMenu
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import {
  menuResourceConfig,
  FilterConfig,
  MenuFilterConfig
} from '@/data/authority-management'

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
      createDialogVisible: false,
      editDialogVisible: false,
      list:[],
      deleteDisabled: true,
      selectData: []
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData(_filter) {
      this.listLoading = true
      let query={
        sort:{
          asc:["sort"]
        },
        keyword: _filter,
        keywordField:['menuName'],
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
    pagination(val){

      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: "创建菜单",
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
    // 接口获取组织机构树，更新config数据
    __updateMenuTree() {
      let query ={
        parentId: Number(0),
        type: Number(0)
      }
      getMenuOrButtonList(query).then(response => {
        console.log(response);
        this.menuResourceConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
      })
    },
    // 打开弹窗
    openDialog(name, row) {
      console.log(name, row)
      const visible = `${name}DialogVisible`
      this[visible] = true
      // 接口获取组织机构树，更新config数据
      this.__updateMenuTree()
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
        // deleteMenuById(id).then(response => {
        //   this.$message.success('删除成功')
        // })
        this.$message.success('删除成功')
      })
    },
    // submit data
    createSubmit(submitData) {
      console.log(submitData)
      // let query={
      //   entity: submitData
      // }
      // saveMenu(query).then(response => {
      //   console.log(response);
      // })
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
    // 点击表格checkbox框触发
    selectionChange(row) {
      this.selectData = row
      console.log(this.selectData);
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
