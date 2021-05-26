<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar ref="tree" :tree-data="treeData" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <div class="page-button">
        <el-button type="primary" size="medium" @click="save">保存</el-button>
        <el-button type="primary" size="medium" @click="download">下载</el-button>
        <el-button type="primary" size="medium" @click="preview">预览</el-button>
      </div>
      <tinymce ref="tinymce" v-model="content" :height="300" :upload-data="uploadData" @submit-content="submitContent" />
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
  download,
  getDictData,
  getObjectByPage
} from '@/api/emergency-rescue'

export default {
  name: 'AccidentPlan',
  components: { TreeBar, Tinymce },
  data() {
    return {
      treeExtend: true,
      bussiness: 'yjjySpecialPlans',
      selectTree: '',
      treeData: {
        // checkbox: true,
        tId: 'value',
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
      content: '',
      uploadData: {
        menuId: this.$route.name
      },
      yjjySpecialPlansId: ''
    }
  },
  created() {
    this.__updateOrganTree()
  },
  methods: {
    // 更新树
    __updateOrganTree() {
      getDictData(9).then(response => {
        response.data.forEach(r => {
          r['value'] = r['label'] = r.dictName
        })
        this.treeData.list = response.data
        console.log(response.data)
        const selectedTree = response.data[0]['dictName']
        if (selectedTree) {
          this.$refs.tree.setCurrentKey(selectedTree)
          this.handleNodeClick({ value: selectedTree })
        }
      })
      // getYjjySpecialPlansTree(this.$route.name).then(response => {
      //   console.log(response)
      //   this.treeData.list = response.data
      //   const selectedTree = response.data[0]['children'].length > 0 ? response.data[0]['children'][0][this.treeData.tId] : response.data[0][this.treeData.tId]
      //   this.$refs.tree.setCurrentKey(selectedTree)
      //   this.handleNodeClick({ value: selectedTree })
      // })
    },
    // 点击树形菜单时触发
    handleNodeClick(data) {
      this.selectTree = data.value
      // getObjectById(data.value, this.bussiness).then(res => {
      //   if (res.data) {
      //     this.content = res.data.content
      //     this.type = `${res.data.type}.html`
      //   }
      // })
      const params = {
        entity: {
          type: data.value,
          menuId: this.$route.name
        }
      }
      getObjectByPage(params, this.bussiness).then(res => {
        if (res.data) {
          this.content = res.data.rows[0].content
          this.type = `${res.data.rows[0].type}.html`
          this.yjjySpecialPlansId = res.data.rows[0].yjjySpecialPlansId
        }
      })
    },
    save() {
      if (this.selectTree == 0) {
        this.$message.warning('请选择具体的节点')
        return
      }
      const data = {
        content: this.$refs.tinymce.getContent(),
        yjjySpecialPlansId: this.yjjySpecialPlansId
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
        fileName: this.type
      }
      download(data)
    },
    // 预览
    preview() {
      this.$router.push({
        path: `/emergency-rescue/rescue-plan/accident-plan/preview`,
        query: {
          docId: this.yjjySpecialPlansId
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
  padding: 0 0 10px 0;
  border-bottom: 1px solid #ededed;
}
</style>
