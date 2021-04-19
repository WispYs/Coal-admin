<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <div class="page-button">
        <el-button type="primary" size="medium" @click="save">保存</el-button>
        <el-button type="primary" size="medium" @click="download">下载</el-button>
        <el-button type="primary" size="medium" @click="preview">预览</el-button>
      </div>
      <tinymce v-model="content" :height="300" @submit-content="submitContent" />
    </div>
    <router-view />
  </div>

</template>
<script>
import TreeBar from '@/components/TreeBar'
import Tinymce from '@/components/Tinymce'
import {
  getYjjySpecialPlansTree,
  getObjectById,
  updateObject,
  download
} from '@/api/emergency-rescue'

export default {
  name: 'EmergencySpecialPlan',
  components: { TreeBar, Tinymce },
  data() {
    return {
      treeExtend: true,
      bussiness: 'yjjySpecialPlans',
      selectTree: 0,
      treeData: {
        title: '选择事故类型',
        list: [
          { value: 2, label: '机关', children: [
            { value: 3, label: '矿领导' },
            { value: 4, label: '办公室', children: [
              { value: 5, label: '部门', children: [
                { value: 6, label: '安全部门' },
                { value: 7, label: '监管部门' },
                { value: 8, label: '采掘部门' },
                { value: 9, label: '生产部门' },
                { value: 10, label: '调度部门' },
                { value: 11, label: '防控部门' },
                { value: 12, label: '应急部门' }
              ] },
              { value: 13, label: '办公室科室（中央区）' },
              { value: 14, label: '办公室科室（南区）' },
              { value: 15, label: '办公室科室（西区）' },
              { value: 16, label: '办公室科室（东区）' }
            ] },
            { value: 17, label: '人力资源部' }
          ] }
        ]
      },
      type: '',
      content: ''
    }
  },
  created() {
    this.__updateOrganTree()
  },
  methods: {
    // 更新树
    __updateOrganTree() {
      getYjjySpecialPlansTree().then(response => {
        console.log(response)
        this.treeData.list = response.data
      })
    },
    // 点击树形菜单时触发
    handleNodeClick(data) {
      this.selectTree = data.value
      getObjectById(data.value, this.bussiness).then(res => {
        if (res.data) {
          this.content = res.data.content
          this.type = `${res.data.type}.html`
        }
      })
    },
    save() {
      const data = {
        content: this.content,
        yjjySpecialPlansId: this.selectTree
      }
      updateObject(data, this.bussiness).then(res => {
        this.$message({
          message: `保存成功`,
          type: 'success'
        })
      })
    },
    download() {
      const data = {
        content: this.content,
        name: this.type
      }
      download(data)
    },
    // 预览
    preview() {
      this.$router.push({
        name: 'EmergencySpecialPlanPreview',
        params: {
          docId: this.selectTree
        }
      })
    },
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
