<template>
  <el-dialog
    title="资源分配"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="closeDialog"
  >
    <el-form ref="formData" class="resource-container" :model="formData" label-width="120px" size="medium" :inline="true">
      <el-form-item label="门户资源：" style="width: 100%">
        <el-checkbox-group v-model="formData.cfgResourceIds">
          <el-checkbox v-for="(it, index) in resourceList" :key="index" :label="it.cfgResourceId">{{ it.title }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item></el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="submitLoading" type="primary" size="medium" @click="onSubmit">提交</el-button>
      <el-button size="medium" @click="closeDialog">取消</el-button>
    </span>
  </el-dialog>

</template>
<script>
import { getPortalResourceList } from '@/api/portal-manage'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitLoading: false, // 提交按钮loading状态
      resourceList: [],
      formData: { cfgResourceIds: [] }
    }
  },
  mounted() {
    this.__initResourceList()
  },
  methods: {
    // 初始化资源列表
    __initResourceList() {
      const query = {
        page: 1,
        pagerows: 1000
      }
      getPortalResourceList(query).then(response => {
        this.resourceList = response.data.rows
      })
    },
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 更新组件内 form 数据
    updataForm(form) {
      this.formData = Object.assign(this.formData, form)
    },

    // 清空组件 form 数据
    resetForm() {
      this.resetSubmitBtn()
      this.$nextTick(() => {
        this.$refs.formData.resetFields()
      })
    },

    // 当提交失败的时候重置按钮状态
    resetSubmitBtn() {
      this.submitLoading = false
    },

    // 提交
    onSubmit() {
      this.submitLoading = true
      this.$emit('submit', this.formData)
    }
  }
}
</script>
<style lang="scss" scoped>
.resource-container {
  padding: 40px;
  ::v-deep {
    .el-form-item__content {
      width: calc(100% - 132px);
    }
  }
}
</style>
