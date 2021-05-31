<template>
  <div class="safety-wrapper">
    <div v-for="(item, index) in safetyList" :key="index" class="safety-item">
      <div class="safety-item__title">
        <p>{{item.title}}</p>
      </div>
      <div class="safety-item__content">
        <div v-for="(data, d_index) in item.data" :key="d_index" style="width: 4.1rem;height: 2.6rem;position: relative;margin: 0.2rem auto 0;">
          <img :src= "data.src" style="width: 4.1rem;height: 2.6rem;margin:auto;border-radius: 2%;"/>
          <div style="opacity:0.5;position: absolute;background-color: #075e88;width: 4.1rem;height: 0.45rem;bottom: 0%;"></div>
          <div style="position: absolute;text-align: center;background-color: #075e88;width: 4.1rem;height: 0.45rem;line-height: 0.45rem;bottom: 0%;">
            <span style="color: #fff;">{{data.title}}</span>
            <i @click="enlargeClick(data.src)" class="el-icon-rank" style="transform:rotate(45deg);float: right;line-height: 0.45rem;color: #1fefff;font-size: 0.26rem;margin-right: 0.1rem;"></i>
          </div>
        </div>
      </div>
    </div>
    <div class='popContainer' v-if="enlargeVisible">
      <img :src="imgUrl">
      <span @click="closeMask">×</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      safetyList: [
        {
          title: '报告流程',
          data: [{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart.jpg')
          },
          {
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart.jpg')
          },
          {
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart.jpg')
          }],
        },
        {
          title: '处置流程',
          data: [{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart1.jpg')
          },{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart1.jpg')
          },
          {
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart1.jpg')
          }],
        },
        {
          title: '应急处置职责',
          data: [{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart4.jpg')
          },{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart4.jpg')
          },{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart4.jpg')
          }],
        },
        {
          title: '责任清单',
          data: [{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart2.jpg')
          },{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart2.jpg')
          },{
            title: '报告流程图.jpg',
            src: require('@/assets/images/flow_chart2.jpg')
          }],
        }
      ],
      enlargeVisible: false,
      imgUrl: '',
    }
  },
  methods: {
    enlargeClick(img){
      this.enlargeVisible = true
      this.imgUrl = img
    },
    closeMask(){
      this.enlargeVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.safety-wrapper {
  display: flex;
  @include clearfix;
  .safety-item {
    flex: 1;
    width: 4.5rem;
    height: 9.2rem;
    margin-right: .2rem;
    background: url('~@/assets/images/big_data_driving.png') no-repeat;
    background-size: cover;
    &:nth-of-type(4n) {
      margin-right: 0;
    }
    &__title {
      @include ellipsis(100%);
      height: .48rem;
      line-height: .48rem;
      padding: 0 .15rem;
      font-size: .2rem;
      color: #62eaff;
    }
    &__content {
      color: #414e6f;
      height: calc(100% - .48rem);
    }
  }
  .popContainer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    padding: .2rem;

    span{
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 30px;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
    }
    img{
      display: block;
      margin: 0 auto;
      height: 100%;
    }
  }
}

</style>
