<template>
  <div class="page-container report-table">
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="flowTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
    />

    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />

    <!-- <el-form ref="menuForm" :model="menuForm" label-width="180px" class="configForm">
      <el-form-item
        label="流程名称"
        prop="max"
      >
        <el-select v-model="menuForm.value" placeholder="请选择">
          <el-option
            v-for="item in menuForm.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="流程表"
        prop="max"
      >
        <el-select v-model="menuForm.value" placeholder="请选择">
          <el-option
            v-for="item in menuForm.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('menuForm')">提交</el-button>
        <el-button @click="resetForm('menuForm')">重置</el-button>
      </el-form-item>

      <el-divider />
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="analysisName" label="流程名称" />
        <el-table-column prop="businessTable" label="业务表" />
      </el-table>
    </el-form> -->
  </div>
</template>

<script>
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import { flowTableConfig } from '@/data/flow-management'
import { getApplicationList } from '@/api/flow-management'
export default {
  components: { ListTable, Pagination },
  data() {
    return {
      flowTableConfig,
      id: 'flow-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      listLoading: true,
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      tableData: [
        {
          analysisName: '业务一',
          businessTable: '业务表十'
        }
      ],
      menuForm: {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const query = Object.assign(this.listQuery, sort, { entity })
      getApplicationList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.sysManageId)
        delApplication(row.sysManageId).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 编辑
    editSubmit(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0
      })
      editApplication(query).then(response => {
        console.log(response)
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
      console.log(this.multipleSelection)
    },
    // 打开弹窗
    openDialog(name, row) {
      console.log(name, row)
      const visible = `${name}DialogVisible`
      this[visible] = true
      // getOrganTree().then(response => {
      //   console.log(response.data)
      //   // 更新新增、编辑config数据
      //   flowTableConfig.columns.forEach(it => {
      //     if (it.field === 'sysDeptId') {
      //       it.options = response.data
      //     }
      //   })
      // })
      // // 如果有数据，更新子组件的 formData
      // if (row) {
      //   getApplicationInfo(row.sysManageId).then(response => {
      //     const info = Object.assign(response.data, {
      //       sysDeptId: Number(response.data.sysDeptId) || 0
      //     })
      //     this.$refs.editDialog.updataForm(info)
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.configForm{
  width: 100%;
}
</style>
