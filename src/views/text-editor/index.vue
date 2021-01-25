<template>
  <div class="page-container">
    <div class="tinymce-btn">
      <el-button type="primary" size="medium" @click="onSubmit">保存</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">下载</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">预览</el-button>

    </div>

    <tinymce v-model="content" :height="300" />

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
    onSubmit() {
      console.log(this.content)
    }
  }
}
</script>
<style lang="scss">
.tox-tinymce-aux {
  z-index: 3000!important;
}
.tinymce-btn {
  margin-bottom: 10px;
}
</style>
