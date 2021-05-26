<template>
  <div class="page-container">
    <filter-bar
      :config="AttributeSetFilterConfig"
      @search-click="queryData"
    />
    <list-table
      :id="id"
      ref="organTable"
      :list="list"
      :list-loading="listLoading"
      :config="AttributeSetTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
      @editReport="editReport"
    />

    <div v-show="total>0" class="page-bottom">
      <!-- <el-button
        class="page-bottom__delete"
        type="warning"
        size="small"
        plain
        :disabled="deleteDisabled"
        @click="deleteBatches"
      >
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button> -->
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

    <el-dialog
      title="属性报表"
      :visible.sync="attributeDialogVisible"
      width="500px"
    >
      <div style="height: 300px">
        <iframe :src="iframeUrl" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="attributeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="attributeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FilterBar from '@/components/FilterBar'
import ListTable from './components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import {
  AttributeSetTableConfig,
  AttributeSetFilterConfig
} from '@/data/one-picture-settings'
import { ReportUrl } from '@/api/url'
import {
  delObject,
  saveObject,
  updateObject,
  getObjectByPage,
  getObjectById,
  deleteBatches,
  getAttributeSetSearch
} from '@/api/one-picture-settings'
export default {
  name: 'AttributeSet',
  components: { FilterBar, ListTable, Pagination, FormDialog },
  data() {
    return {
      id: 'attribute-set',
      bussiness: 'sysEntityAttr',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      AttributeSetFilterConfig,
      AttributeSetTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      accidentType: [],
      mapArr: [],
      attributeDialogVisible: false,
      iframeUrl: ''
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    // 获取组织机构列表
    __fetchData() {
      this.listLoading = true
      // const filter = {
      //   ...this.filter,
      //   keywordField: ['entityName']
      // }
      // const query = Object.assign(this.listQuery, filter)
      this.filter.keyword = this.filter.keyword ? this.filter.keyword : ''
      getAttributeSetSearch(this.filter.keyword, this.bussiness).then(response => {
        this.listLoading = false
        // console.log(response.data)
        // 使用同步加载需要去除
        this.formatData(response.data)
        response.data.forEach(r => {
          delete r.hasChildren
          r.children = r.list
        })
        this.list = response.data
        console.log(this.list)
      })
    },
    formatData(data) {
      data.forEach(d => {
        d.id = Number(d.id)
        if (d.list.length) this.formatData(d.list)
      })
    },
    // 编辑报表
    editReport(row) {
      if (!row) return
      this.iframeUrl = `${ReportUrl}/report_platform_sysentityattr.jsp?sysEntityId=${row.id}&entityName=${row.entityName}`
      this.attributeDialogVisible = true
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
        form: this.AttributeSetTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.AttributeSetTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      // console.log(name, row)
      const visible = `${name}DialogVisible`
      this[visible] = true

      this.__updateOrganTree()

      if (row) {
        getObjectById(row['value'], this.bussiness).then(response => {
          const res = response.data
          res['label'] = res['typeName']
          const info = Object.assign(response.data, {
            parentId: Number(res.parentId) || 0,
            code: Number(res.code),
            // value: Number(res.value),
            value: Number(res.value)
          })
          this.oldParentId = info.parentId
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObject(row['value'], this.bussiness).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新建
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0
      })
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      submitData['typeName'] = submitData['label']
      console.log('onSubmit formData', submitData)
      saveObject(query, this.bussiness).then(response => {
        this.__fetchData()
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        // this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 编辑
    editSubmit(submitData) {
      // console.log(submitData)
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      submitData['typeName'] = submitData['label']
      const query = Object.assign(submitData)
      updateObject(query, this.bussiness).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
    },

    // 改变所选项
    selectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
      // console.log(this.multipleSelection)
    },

    // 批量删除
    deleteBatches() {
      const arr = []
      this.multipleSelection.forEach(m => arr.push(m[`${this.bussiness}Id`]))
      if (arr.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatches(arr, this.bussiness).then(res => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    }

  }
}
</script>

<style>

</style>
