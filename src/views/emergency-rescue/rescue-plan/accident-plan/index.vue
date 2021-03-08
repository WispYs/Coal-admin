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
      content: '<p style="text-align: center;"><strong><span style="font-size: 20px;">矿井重大顶板事故现场处置方案</span></strong></p> <p style="text-align: left;"><span style="font-size: 16px;">&nbsp; &nbsp;（一）顶板专项应急救援预案</span></p> <p style="text-align: left;"><span style="font-size: 16px;">&nbsp; &nbsp; &nbsp;<span style="font-size: 14px;">1&nbsp; &nbsp;事故风险风险</span></span></p> <p style="text-align: left;"><span style="font-size: 14px;">&nbsp;&nbsp; &nbsp; &nbsp;1.1 冒顶事故一般发生在掘进巷道、采煤工作面的两端头以及交叉巷道施工时措施不力。</span></p> <p style="text-align: left;"><span style="font-size: 14px;">&nbsp;&nbsp; &nbsp; &nbsp;1.1.1&nbsp; &nbsp;按冒顶范围分为局部冒顶和范围冒顶</span></p> <p style="text-align: left;"><span style="font-size: 14px;">&nbsp;&nbsp; &nbsp; &nbsp;1.1.2 &nbsp;按冒顶事故的力学原因进行分类，可分为压垮型冒顶、漏冒型冒顶和推垮型冒顶三大类。</span></p>'
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
