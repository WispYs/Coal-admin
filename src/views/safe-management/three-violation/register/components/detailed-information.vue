<template>
  <el-dialog
    title="三违详细信息"
    :visible.sync="dialogVisible"
    width="900px"
    :before-close="closeDialog"
  >
    <div class="service-progress-container">
      <div class="progress-item">
        <div class="progress-item__info">
          <el-row class="info-list">
            <el-col :span="8">
              <span class="info-tit">检查部门：</span>
              <span>{{ registerInfo.examineDept }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">检查人员：</span>
              <span>{{ registerInfo.breakUserName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">检查班次：</span>
              <span>{{ registerInfo.examineShift }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">违章日期：</span>
              <span>{{ registerInfo.examineTime }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">违章地点：</span>
              <span>{{ registerInfo.examinePath }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">责任单位：</span>
              <span>{{ registerInfo.unit }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">违章人员：</span>
              <span>{{ registerInfo.breakUserName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">带班班长：</span>
              <span>{{ registerInfo.squadLeader }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">带班区长：</span>
              <span>{{ registerInfo.wardenLeader }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">违章违纪事实：</span>
              <span>{{ registerInfo.disciplinary }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">严重级别：</span>
              <span>{{ registerInfo.gradeName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">处理结果：</span>
              <span>{{ registerInfo.disposeResult }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">处罚扣分：</span>
              <span>{{ registerInfo.disposeDeduct }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">备注：</span>
              <span>{{ registerInfo.remark }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">附件：</span>
              <el-tooltip v-for="img in fileMap['eventId']" :key="img.eventId" effect="light" :content="img.fileName" placement="top">
                <div class="upload-img-wrapper" @click="download(img.url)">
                  <img class="upload-img" :src="img.imgUrl" alt="">
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>

</template>
<script>
import {
  getAqglThreeRegisterById
} from '@/api/hidden-danger'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      registerInfo:{},
      fileMap: {}, // 存储附件url地址
    }
  },
  methods: {
    __fetchData(id){
      getAqglThreeRegisterById(id).then(response =>{
        this.registerInfo= response.data
        Object.keys(response.data).forEach(async it => {
          if(it == 'eventId'){
            // 根据id动态获取附件信息，存储在fileMap中
            this.fileMap[it] = await this.getFileUrls(this.registerInfo[it])
            console.log(this.fileMap);
          }
          // 数据层次太多，render函数没有自动更新，需手动强制刷新
          this.$forceUpdate()
        })
      })
    },
    // 根据附件字段Id获取图片url
    getFileUrls(str) {
      if (str) {
        const eventId = str.split(',')
        return new Promise((resolve, reject) => {
          this.$store.dispatch('upload/getFileUrl', eventId).then((data) => {
            resolve(data)
          }).catch((err) => {
            reject(err)
          })
        })
      }
    },
    download(url) {
      window.open(url)
    },
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>
<style lang="scss" scoped>
  .service-progress-container{
    width: calc(100% - 100px);
    margin: 30px auto;
    .info-list{
      .el-col{
        padding: 10px 0;
        .upload-img-wrapper {
          display: inline-block;
          position: relative;
          cursor: pointer;
          margin: 0 8px 10px 0;
          .upload-img{
            width: 100px;
            height: 100px;
          }
        }
      }
    }
  }
</style>
