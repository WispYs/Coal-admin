<template>
  <div class="page-container">
    <filter-bar
      :config="dataDictionaryFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="dataDictionaryConfig"
      height="calc(100% - 148px)"
      @addIco="(row) => openDialog('create', row)"
      @editIco="(row) => openDialog('edit', row)"
      @deleteIco="deleteClick"
      @selectionChange="selectionChange"
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
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="pagination"
      />
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
  getDictionaryList,
  getSelectSysDict,
  updateSysDict,
  saveSysDict,
  deleteDict
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { dataDictionaryConfig,dataDictionaryFilterConfig } from '@/data/authority-management'

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
      dataDictionaryFilterConfig,
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
      console.log();
      let query = {
        entity:{
          dictName: _filter,
          dictValue: _filter
        },
        sort:{
          asc:["sort"]
        },
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows
      }
      getDictionaryList(query).then(response => {
        console.log(response);
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    pagination(){
      this.__fetchData()
    },
    // 查询数据
    queryData(filter) {
      this.__fetchData(filter.keyword)
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      let arrFilter = this.dataDictionaryConfig.columns.filter((ele, index, arr) => {
        return !!ele.field.indexOf("sysDictId") && !!ele.field.indexOf("dictType")
      })
      const createConfig = Object.assign({
        title: '创建',
        width: '800px',
        form: arrFilter
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      let arrFilter = this.dataDictionaryConfig.columns.filter((ele, index, arr) => {
        return !!ele.field.indexOf("sysDictId") && !!ele.field.indexOf("dictType")
      })
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: arrFilter
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      this.dictTree()
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      } else if (this.selectData.length == 1) {
        this.$refs.editDialog.updataForm(this.selectData[0])
      }
    },
    // 接口获取数据字典树，更新config数据
    dictTree(){
      getSelectSysDict().then(response => {
        console.log(response);
        let dictList = []
        dictList = response.data
        for(let d in response.data){
          this.recursionDict(dictList[d],response.data[d])
        }
        this.dataDictionaryConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = dictList
          }
        })
      })
    },
    recursionDict(dict,data){
      dict.label = data.dictName
      dict.value = data.sysDictId
      dict.children = data.sysDictList
      if(!!data.sysDictList && data.sysDictList.length > 0){
        for(let d in data.sysDictList){
          this.recursionDict(dict.sysDictList[d],data.sysDictList[d])
        }
      }
    },
    // 删除
    deleteClick(id) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDict(id).then(response => {
          console.log(response);
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      console.log(submitData)
      let query ={
        entity: submitData
      }
      saveSysDict(query).then(response => {
        console.log(response);
        this.__fetchData()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      })
    },
    editSubmit(submitData) {
      console.log(submitData)
      let query ={
        entity: submitData
      }
      updateSysDict(query).then(response => {
        console.log(response);
        this.__fetchData()
        this.editDialogVisible = false
        this.$message.success('编辑成功')
      })
      this.editDialogVisible = false
      this.$message.success('编辑成功')
    },
    // 点击表格checkbox框触发
    selectionChange(row) {
      this.selectData = row
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
