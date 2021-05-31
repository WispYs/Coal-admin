<template>
  <div class="video-capture">
    <div class="item-title has-sum">
      <p>视频抓拍</p>
      <div class="title-sum">总数：653</div>
    </div>
    <div class="item-content">
      <div class="video-capture__card">
        <div v-for="(it,index) in data" :key="index" class="video-capture__card__item">
          <img :src="it" alt="">
        </div>
      </div>
      <el-pagination
        class="video-pagination"
        background
        layout="prev, pager, next"
        :total="1000"
        :page-size="10"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      />

    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      const newData = this.data.sort(() => Math.random() - 0.5)
      this.$emit('update:data', newData)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .video-capture {
    float: left;
    width: 9.2rem;
    height: 100%;
    background: url('~@/assets/images/big-data_wisdom_bg2.png') no-repeat;
    background-size: cover;
    &__card {
      @include ellipsis(100%);
      height: 4.2rem;
      margin: .1rem;
      &__item {
        float: left;
        width: calc((100% - .4rem)/3);
        // width: 2.8rem;
        height: 2rem;
        background: url('~@/assets/images/big-data_wisdom_video.png') no-repeat;
        background-size: cover;
        margin-right: .2rem;
        margin-bottom: .2rem;
        img {
          width: 100%;
          height: 100%;
        }
        &:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
    .video-pagination {
      text-align: center;
      margin-top: .3rem;
      overflow: hidden;
    }
    ::v-deep {
      .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
        background-color: #122d52;
        color: #1fefff;
        border: 1px solid #1fefff;
        box-sizing: content-box;
      }
      .el-pager li {
        padding: 0;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #0286fe;
        color: #fff;
      }
      .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #fff;
      }
    }
  }

</style>
