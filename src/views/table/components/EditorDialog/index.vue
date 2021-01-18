<template>
  <el-dialog
    title="创建"
    :visible.sync="dialogVisible"
    width="500px"
  >
    <el-form ref="editorForm" class="dialog-container" :model="editorForm" label-width="100px">
      <el-form-item label="标题：">
        <el-input v-model="editorForm.title" />
      </el-form-item>
      <el-form-item label="项目负责人：">
        <el-input v-model="editorForm.person" />
      </el-form-item>
      <el-form-item label="项目状态：">
        <el-select v-model="editorForm.status" placeholder="请选择项目状态" style="width: 100%;">
          <el-option v-for="(status,index) in statusOption" :key="index" :label="status.name" :value="status.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目时间：">
        <el-date-picker v-model="editorForm.time" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择项目时间" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="项目金额：">
        <el-input v-model="editorForm.money">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="项目完成率：">
        <el-slider v-model="editorForm.completed" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import eventHub from '@/utils/event-hub'

export default {
  data() {
    return {
      dialogVisible: false,
      statusOption: [
        {
          name: '未开始',
          value: 1
        }, {
          name: '进行中',
          value: 2
        }, {
          name: '已完成',
          value: 3
        }, {
          name: '已搁置',
          value: 4
        }
      ],
      editorForm: {
        title: '',
        person: '',
        time: '',
        money: '',
        status: '',
        completed: 0
      }
    }
  },
  created() {
    eventHub.$on('open-editor-dialog', (dialogVisible, data) => {
      this.dialogVisible = dialogVisible
      console.log(data)
      this.editorForm = Object.assign({}, data)
    })
  },
  methods: {
    onSubmit() {
      console.log(this.editorForm)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
