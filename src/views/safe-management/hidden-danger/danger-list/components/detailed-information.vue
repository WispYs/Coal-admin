<template>
  <el-dialog title="隐患清单详情" :visible.sync="dialogVisible" width="900px" :before-close="closeDialog">
    <div class="service-progress-container" v-if="dialogVisible">
      <div class="progress-item" v-if="registerInfo.aqglHiddenRegister">
        <p class="progress-item__title">设备故障基础信息</p>
        <div class="progress-item__info">
          <el-row class="info-list">
            <el-col :span="8">
              <span class="info-tit">检查时间：</span>
              <span>{{ registerInfo.aqglHiddenRegister.examineTime }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">班次：</span>
              <span>{{ registerInfo.aqglHiddenRegister.examineShift }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">检查类别：</span>
              <span>{{ registerInfo.aqglHiddenRegister.examineType }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">检测单位：</span>
              <span>{{ registerInfo.aqglHiddenRegister.examineUnit }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">检查人员：</span>
              <span>{{ registerInfo.aqglHiddenRegister.examineUserName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">陪检人员：</span>
              <span>{{ registerInfo.aqglHiddenRegister.accompany }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">隐患部门：</span>
              <span>{{ registerInfo.aqglHiddenRegister.hiddenDept }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">责任人员：</span>
              <span>{{ registerInfo.dutyUserName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">隐患地点：</span>
              <span>{{ registerInfo.aqglHiddenRegister.examinePath }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">隐患类别：</span>
              <span>{{ registerInfo.aqglHiddenRegister.hiddenType }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">隐患级别：</span>
              <span>{{ registerInfo.aqglHiddenRegister.hiddenGrade }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">限改时间：</span>
              <span>{{ registerInfo.aqglHiddenRegister.xgTime }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">复查单位：</span>
              <span>{{ registerInfo.aqglHiddenRegister.reviewUnit }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">状态：</span>
              <span>{{ registerInfo.aqglHiddenRegister.hiddenStatus }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">状态内容：</span>
              <span>{{ registerInfo.aqglHiddenRegister.statusExplain }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">隐患内容：</span>
              <span>{{ registerInfo.aqglHiddenRegister.hiddenContent }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">整改意见：</span>
              <span>{{ registerInfo.aqglHiddenRegister.rectifyPlan }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">附件1：</span>
              <el-tooltip v-for="img in fileMap['aqglHiddenRegister']" :key="img.eventId" effect="light" :content="img.fileName" placement="top">
                <div class="upload-img-wrapper" @click="download(img.url)">
                  <img class="upload-img" :src="img.imgUrl" alt="">
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="progress-item" v-if="registerInfo.aqglHiddenMeasure">
        <p class="progress-item__title">整改措施</p>
        <div class="progress-item__info">
          <el-row class="info-list">
            <el-col :span="8">
              <span class="info-tit">整改人员：</span>
              <span>{{ registerInfo.aqglHiddenMeasure.abarbeitungUser }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">完成时间：</span>
              <span>{{ registerInfo.aqglHiddenMeasure.completeTime }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">所需金额：</span>
              <span>{{ registerInfo.aqglHiddenMeasure.theMoney }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">整改措施：</span>
              <span>{{ registerInfo.aqglHiddenMeasure.measure }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">整改说明：</span>
              <span>{{ registerInfo.aqglHiddenMeasure.measureExplain }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">附件2：</span>
              <el-tooltip v-for="img in fileMap['aqglHiddenMeasure']" :key="img.eventId" effect="light" :content="img.fileName" placement="top">
                <div class="upload-img-wrapper" @click="download(img.url)">
                  <img class="upload-img" :src="img.imgUrl" alt="">
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="progress-item" v-if="registerInfo.aqglReviewMsg">
        <p class="progress-item__title">复查信息</p>
        <div class="progress-item__info">
          <el-row class="info-list">
            <el-col :span="8">
              <span class="info-tit">复查人员：</span>
              <span>{{ registerInfo.aqglReviewMsg.reviewUser }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">复查时间：</span>
              <span>{{ registerInfo.aqglReviewMsg.reviewTime }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">复查结果：</span>
              <span>{{ registerInfo.aqglReviewMsg.reviewResult }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">附件3：</span>
              <el-tooltip v-for="img in fileMap['aqglReviewMsg']" :key="img.eventId" effect="light" :content="img.fileName" placement="top">
                <div class="upload-img-wrapper" @click="download(img.url)">
                  <img class="upload-img" :src="img.imgUrl" alt="">
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="progress-item">
        <p class="progress-item__title">操作过程</p>
        <div class="progress-item__info">
          <list-table :list="registerInfo.list" :list-loading="false" :config="dangerListoperation"/>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>

</template>
<script>
  import { getHiddenRegisterDetails } from '@/api/hidden-danger'
  import ListTable from '@/components/ListTable'
  import { dangerListoperation } from '@/data/hidden-danger'
  export default {
    components:{
      ListTable
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        registerInfo: {},
        dangerListoperation,
        fileMap: {}, // 存储附件url地址
      }
    },
    methods: {
      // 更新父组件 xxxxxDialogVisible 的值
      closeDialog() {
        this.$emit('close-dialog')
      },
      __fetchData(id){
        getHiddenRegisterDetails(id).then(response =>{
          this.registerInfo= response.data
          Object.keys(response.data).forEach(async it => {
            if(it != 'list'){
              // 根据id动态获取附件信息，存储在fileMap中
              this.fileMap[it] = await this.getFileUrls(this.registerInfo[it].eventId)
            }
            console.log(this.fileMap);
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/theme.scss';
  @import '~@/assets/styles/variables.scss';

  .service-progress-container {
    width: calc(100% - 100px);
    margin: 30px auto;

    .progress-item {
      margin-bottom: 20px;

      &__title {
        position: relative;
        margin-bottom: 10px;
        line-height: 20px;
        @include primaryColor($primaryColor);

        &::after {
          content: '';
          width: 3px;
          height: 16px;
          @include primaryBg($primaryColor);
          position: absolute;
          top: 2px;
          left: -8px;
        }
      }

      &__info {
        margin: 0;
        color: #121212;
        font-size: 13px;
        padding-left: 20px;

        .info-list {
          margin-bottom: 4px;

          .el-col {
            padding: 10px 0
          }
        }

        .info-tit {
          color: #999;
        }

        .info-card {
          font-size: 13px;

          b {
            @include primaryColor($primaryColor);
          }
        }
      }
    }
  }
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
</style>
