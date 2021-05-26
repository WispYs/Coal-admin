<template>
  <div class="page-container">
    <div class="buttons" style="margin-bottom: 16px;">
      <div class="buttons_item">
        <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />创建
        </el-button>
      </div>
    </div>

    <list-table
      :id="id"
      ref="organTable"
      :list="list"
      :list-loading="listLoading"
      :config="NewsTypeConfig"
      height="calc(100% - 148px)"
      @load-tree-data="asyncData"
      @selectionChange="selectionChange"
      @addIco="(row) => openDialog('create', row)"
      @editIco="(row) => openDialog('edit', row)"
      @deleteIco="deleteClick"
    />

    <div v-show="total>0" class="page-bottom">
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
    </div>
    <!-- 新建弹窗 -->
    <form-dialog
      ref="createDialog"
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @select-focus="selectFocus"
      @select-change="selectChange"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @select-focus="selectFocus"
      @select-change="selectChange"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />
  </div>
</template>

<script>
import {
  selectUserList,
  getOrganTree,
  getNewsTypeList,
  saveNewsType,
  updateNewsType,
  deleteNewsType,
  getChildrenMsgList,
  getSelectRoleList,
  selectTemplateList,
  getTtypelistByParentId,
  getMsgTypeById
} from '@/api/authority-management'
import {
  getsysDictListById
} from '@/api/hidden-danger'
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
      selectData: [],
      createDialogVisible: false,
      editDialogVisible: false,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      list: [],
      msgList: [], // 获取所有消息类型列表
      mapArr: [], // 存储异步加载的树状节点数据数组
      oldParentId: '', // 编辑节点前树状节点id
      openType: ''
    }
  },
  created() {
    this.fetchSelectList()
    this.fetchNodeData()
    this.getTemplateList()
    this.__fetchData()
  },
  methods: {
    fetchNodeData() {
      const query = { }
      getChildrenMsgList(query).then(response => {
        this.NewsTypeConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
      })
    },
    fetchSelectList() {
      const query = [{
        // 消息级别
        parentId: 111186
      }, {
        // 提示方式
        parentId: 111199
      }, {
        // 目标类型
        parentId: 111190
      }, {
        // 发送方式
        parentId: 111194
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              value: response.data[m].sysDictId,
              label: response.data[m].dictName
            })
          }
          console.log(selectList)
          this.NewsTypeConfig.columns.forEach(it => {
            if (query[q].parentId == 111186) {
              if (it.field === 'sysDictId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111199) {
              if (it.field === 'notifyWay') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111190) {
              if (it.field === 'targetId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111194) {
              if (it.field === 'sendType') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    getTemplateList() {
      const query = {}
      selectTemplateList(query).then(response => {
        const templateList = []
        for (const res of response.data) {
          templateList.push({
            label: res.templateName,
            value: res.sysMsgTemplateId
          })
        }
        this.NewsTypeConfig.columns.forEach(it => {
          if (it.field == 'sysMsgTemplateId') {
            it.options = templateList
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        entity: {
          parentId: 0
        },
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows
      }
      getNewsTypeList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          response.data.rows.forEach(it => {
            if (it.parentCheck === 1) {
              it.hasChildren = true
            }
          })
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
      })
    },
    // 异步获取树子节点数据
    asyncData(tree, treeNode, resolve) {
      // 将当前选中节点数据存储到mapArr中
      this.mapArr[tree.sysMsgTypeId] = { tree, treeNode, resolve }
      getTtypelistByParentId(tree.sysMsgTypeId).then(response => {
        const childrenTree = []
        response.data.forEach(it => {
          const item = {
            sysMsgTypeId: it.sysMsgTypeId,
            typeName: it.typeName,
            parentId: it.parentId,
            sysDictId: it.sysDictId,
            notifyWay: it.notifyWay,
            targetId: it.targetId,
            typeId: it.typeId,
            sendType: it.sendType,
            sysMsgTemplateId: it.sysMsgTemplateId,
            sort: it.sort,
            remark: it.remark,
            hasChildren: it.parentCheck === 1
          }
          childrenTree.push(item)
        })
        resolve(childrenTree)
      })
    },
    // 重新触发树形表格的loadTree函数
    refreshLoadTree(parentId) {
      const mapsData = this.mapArr[parentId]
      // 如果mapsData不为undefined，则表示之前打开过树形结构
      if (mapsData) {
        const { tree, treeNode, resolve } = mapsData
        this.asyncData(tree, treeNode, resolve)
      }
      this.$refs.organTable.refreshLoadTree(parentId)
    },

    // 打开弹窗
    async openDialog(name, row) {
      this.openType = name
      const visible = `${name}DialogVisible`
      this[visible] = true
      const query = {
        parentId: 0
      }
      if (row) {
        // 如果有数据，更新子组件的 formData
        getMsgTypeById(row.sysMsgTypeId).then(response => {
          this.oldParentId = response.data.parentId
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '创建',
        width: '1000px',
        form: this.NewsTypeConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.NewsTypeConfig.columns
      })
      return editConfig
    },
    // 点击删除触发
    deleteClick(data) {
      this.$confirm('确定删除该配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNewsType(data.sysMsgTypeId).then(response => {
          this.refreshLoadTree(data.parentId)
          this.fetchNodeData()
          this.__fetchData()
          this.$message.success('删除成功')
        })
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
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      saveNewsType(submitData).then(response => {
        this.createDialogVisible = false
        this.refreshLoadTree(submitData.parentId)
        this.fetchNodeData()
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      updateNewsType(submitData).then(response => {
        this.editDialogVisible = false
        // 更新编辑前后父节点数据
        this.refreshLoadTree(submitData.parentId)
        this.refreshLoadTree(this.oldParentId)
        this.fetchNodeData()
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    // 提醒目标聚焦时触发
    selectFocus(item) {

    },
    // 目标类型改变时触发
    selectChange(item, row, _data) {
      // 用户
      if (row == '111191') {
        const query = {}
        selectUserList(query).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              label: response.data[m].loginName,
              value: response.data[m].sysUserId
            })
          }
          this.NewsTypeConfig.columns.forEach(it => {
            if (it.field === 'typeId') {
              it.options = selectList
            }
          })
        })
      } else if (row == '111192') {
        // 部门
        getOrganTree().then(response => {
          this.NewsTypeConfig.columns.forEach(it => {
            if (it.field === 'typeId') {
              it.layout = 'TreeSelect'
              it.options = response.data
            }
          })
        })
      } else if (row == '111193') {
        // 角色
        const query = {}
        getSelectRoleList(query).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              label: response.data[m].roleName,
              value: response.data[m].sysRoleId
            })
          }
          this.NewsTypeConfig.columns.forEach(it => {
            if (it.field === 'typeId') {
              it.options = selectList
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
