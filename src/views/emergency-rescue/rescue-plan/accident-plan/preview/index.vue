<template>
  <div class="preview">
    <div class="button-wrapper">
      <el-button type="primary" @click="$router.back()">返回</el-button>
    </div>
    <div class="page-container">
      <div v-html="content" />
    </div>

  </div>
</template>

<script>
import { getObjectById } from '@/api/emergency-rescue'
export default {
  data() {
    return {
      content: ''
    }
  },
  created() {
    this.getContent()
  },
  methods: {
    getContent() {
      getObjectById(this.$route.query.docId, 'yjjySpecialPlans').then(res => {
        if (res.data) {
          this.content = res.data.content
        }
      })
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  position: absolute !important;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
.page-container {
  // height: calc(100vh - 140px);
}
.button-wrapper {
  width: 100%;
  padding: 0 20px;
    height: 50px;
    line-height: 50px;
    // position: fixed;
    // top: 140px;
    background: #fff;
}
</style>
