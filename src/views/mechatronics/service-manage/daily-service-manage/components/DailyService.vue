<template>
  <el-dialog
    title="日常维检"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="closeDialog"
  >
    <el-form ref="formData" class="dialog-container" :model="formData" :rules="formRules" label-width="120px" size="medium" :inline="true">
      <el-form-item label="所属场所" prop="area">
        <el-input v-model="formData.area" style="200px;" disabled class="form-item" placeholder="请填写所属场所" />
      </el-form-item>
      <el-form-item label="所属计划" prop="plan">
        <el-input v-model="formData.plan" style="200px;" disabled class="form-item" placeholder="请填写所属计划" />
      </el-form-item>
      <el-form-item label="维检时间" prop="time">
        <el-date-picker
          v-model="formData.time"
          class="form-item"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择维检时间"
        />
      </el-form-item>
      <el-form-item label="维检情况" prop="condition" class="full-line">
        <el-input
          v-model="formData.condition"
          type="textarea"
          placeholder="请填写维检情况"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="维检结果" prop="result" class="full-line">
        <el-radio-group v-model="formData.result">
          <el-radio-button :label="1">正常</el-radio-button>
          <el-radio-button :label="0">异常</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <template v-if="!formData.result">
        <el-form-item label="故障主题" prop="subject" class="full-line">
          <el-input
            v-model="formData.subject"
            type="textarea"
            placeholder="请填写故障主题"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="故障情况" prop="fault" class="full-line">
          <el-input
            v-model="formData.fault"
            type="textarea"
            placeholder="请填写故障情况"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="指定维修人" prop="server" class="full-line">
          <el-input
            v-model="formData.server"
            type="textarea"
            placeholder="请填写指定维修人"
            style="width: 100%"
          />
        </el-form-item>
      </template>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="closeDialog">取消</el-button>
      <el-button :loading="submitLoading" type="primary" size="medium" @click="onSubmit">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      formData: {
        area: '中央区主井提升机房',
        plan: '主电机碳刷',
        time: '',
        condition: '',
        result: 1,
        subject: '',
        fault: '',
        server: ''
      },
      submitLoading: false, // 提交按钮loading状态
      formRules: {
        time: [
          { required: true, message: '请选择维检时间', trigger: 'blur' }
        ],
        condition: [
          { required: true, message: '请填写维检情况', trigger: 'blur' }
        ],
        result: [
          { required: true, message: '请选择维检结果', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '请填写故障主题', trigger: 'blur' }
        ],
        fault: [
          { required: true, message: '请填写故障情况', trigger: 'blur' }
        ],
        server: [
          { required: true, message: '请填写指定维修人', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 更新组件内 form 数据
    updataForm(form) {
      this.formData = Object.assign(this.formData, form)
      console.log(this.formData)
    },

    // 当提交失败的时候重置按钮状态
    resetSubmitBtn() {
      this.submitLoading = false
    },

    // 清空组件 form 数据
    resetForm() {
      this.resetSubmitBtn()
      this.$nextTick(() => {
        this.$refs.formData.resetFields()
      })
    },

    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.$emit('submit', this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.resetForm()
      this.$emit('close-dialog')
    }
  }
}
</script>
<style lang="scss">
.full-line {
  .el-form-item__label {
    float: left;
  }
  .el-form-item__content {
    display: block;
    margin-left: 120px;
  }
}
</style>
<style lang="scss" scoped>
.full-line {
  display: block;
}
.file-title {
  margin: 0;
  font-size: 13px;
  line-height: 32px;
}
.form-item {
  width: 200px;
}
.naozhewan {
  color: #999;
  font-size: 12px;
  margin-left: 10px;
  display: inline-block;
  width: 80px;
  white-space: nowrap;
}
</style>
