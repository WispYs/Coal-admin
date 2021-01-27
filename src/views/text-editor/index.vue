<template>
  <div class="page-container">
    <tinymce v-model="content" :height="300" @submit-content="submitContent" />

  </div>

</template>
<script>
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      content: '<h1>Demo</h1>'
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
</style>
