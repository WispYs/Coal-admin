<template>
  <div class="page-container">
    <div class="buttons" style="margin-bottom: 16px;">
      <div class="buttons_item">
        <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />创建
        </el-button>
        <!-- <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="openDialog('edit')"><i class="el-icon-edit el-icon--left" />编辑
        </el-button>
        <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deleteClick"><i class="el-icon-delete el-icon--left" />删除
        </el-button>
        <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button> -->
      </div>
    </div>

    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="NewsTypeConfig"
      height="calc(100% - 148px)"
      @selectionChange="selectionChange"
      @addIco="(row) => openDialog('create', row)"
      @editIco="(row) => openDialog('edit', row)"
      @deleteIco="deleteClick"
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
        @pagination="__fetchData"
      />
    </div>
    <!-- 新建弹窗 -->
    <form-dialog
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @selectChange="selectChange"
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
    getAllUserList,
    getOrganTree,
    getNewsTypeList,
    saveNewsType,
    updateNewsType,
    deleteNewsType,
    getChildrenMsgList
  } from '@/api/authority-management'
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
      list: [],
      msgList:[]  //获取所有消息类型列表
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      let query={
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        sort:{asc:["sort"]}
      }
      getNewsTypeList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          if (it.parentCheck === 1) {
            it.hasChildren = true
          }
        })
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      console.log(row)
      let query = {
        parentId: 0
      }
      getChildrenMsgList(query).then(response => {
        console.log(response);
        this.msgList = response.data
        for(let m in response.data){
          this.msgRecursion(this.msgList[m],response.data[m]);
        }
        console.log(this.msgList);
        this.NewsTypeConfig.columns.forEach(it => {
          if (it.field === "parentId") {
            it.options = this.msgList
          }
        })
      })
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      } else if (this.selectData.length == 1) {
        this.$refs.editDialog.updataForm(this.selectData[0])
      }
    },
    msgRecursion(mList,_data){
      mList.label = _data.typeName
      mList.value = _data.sysMsgTypeId
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
    deleteClick(data) {
      console.log(data);
      deleteNewsType(data.sysMsgTypeId).then(response => {
        this.__fetchData()
        this.$message.success('删除成功')
      })
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
      const query = Object.assign(submitData, {
        sort: Number(submitData.sort) || 0
      })
      saveNewsType(query).then(response => {
        this.createDialogVisible = false
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      })

    },
    editSubmit(submitData) {
      updateNewsType(submitData).then(response => {
        console.log(response);
        this.editDialogVisible = false
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.$message.success('编辑成功')
      })
    },
    selectChange(item,row){
      console.log(item,row);
      console.log(row);
      if(row == 1){
        getAllUserList().then(response => {
          console.log(response.data);
          this.NewsTypeConfig.columns.forEach(it => {
            if (it.field === 'targetValue') {
              it.options = []
            }
          })
        })
      }else if(row == "部门"){
        getOrganTree().then(response => {
          this.NewsTypeConfig.columns.forEach(it => {
            if (it.field === 'targetValue') {
              it.options = response.data
            }
          })
        })
      }else if(row == 3){
        this.NewsTypeConfig.columns.forEach(it => {
          if (it.field === 'targetValue') {
            it.options = []
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
