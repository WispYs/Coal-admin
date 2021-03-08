<template>
  <div class="page-container">
    <div class="page-button">
      <el-button type="primary" size="medium">保存</el-button>
      <el-button type="primary" size="medium">下载</el-button>
      <el-button type="primary" size="medium">预览</el-button>
    </div>
    <tinymce v-model="content" :height="300" @submit-content="submitContent" />

  </div>

</template>
<script>
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      content: '<p style="text-align: center;"><strong><span style="font-size: 20px;">运输数字文档</span></strong></p>'
    }
  },
  methods: {
    submitContent() {
      console.log(this.content)
      this.$confirm('确定保存该文档?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: `保存成功${this.content}`,
          type: 'success'
        })
      }).catch(() => {
        console.log('cancel')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tinymce-btn {
  margin-bottom: 10px;
}
.page-button {
  padding: 10px 0;
  border-bottom: 1px solid #ededed;
}
</style>
