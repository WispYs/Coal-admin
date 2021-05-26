<template>
  <div class="work-condition">
    <div class="item-title">
      <p>工况状态</p>
      <el-select v-model="time" placeholder="请选择" class="title-select" popper-class="decision__select">
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="item-content">
      <div class="work-card">
        <div class="work-card__box">
          <div v-for="(it,index) in workCard" :key="index" class="work-card__item">
            <p>{{ it.value }}</p>
            <span>{{ it.label }}</span>
          </div>
        </div>
        <div class="work-card__tag">当前矿井生产产量进度正常，满足接替计划要求</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: '月',
      select: [
        { value: '年', label: '年' },
        { value: '月', label: '月' },
        { value: '日', label: '日' }
      ],
      workCard: [
        { value: '28.6', label: '原煤功效(吨/工)' },
        { value: '3269', label: '原煤功效(吨/工)' },
        { value: '5924', label: '原煤功效(吨/工)' },
        { value: '0.24', label: '原煤功效(吨/工)' },
        { value: '12.89', label: '原煤功效(吨/工)' },
        { value: '75.12', label: '原煤功效(吨/工)' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .work-condition {
    height: 2.87rem;
    .work-card {
      &__box {
        @include clearfix;
      }
      &__item {
        float: left;
        // width: 1.26rem;
        width: calc((100% - 0.4rem)/3);
        height: 1rem;
        margin-right: .2rem;
        background: url('~@/assets/images/big-data_decision_work.png') no-repeat bottom center;
        background-size: contain;
        text-align: center;
        &:nth-of-type(3n) {
          margin-right: 0;
        }
        p {
          font-size: .22rem;
          color: #1fefff;
        }
        span {
          @include ellipsis(100%);
          display: block;
          font-size: .12rem;
          color: #fff;
        }
      }
      &__tag {
        @include ellipsis(100%);
        height: .32rem;
        line-height: .32rem;
        border: 1px solid #2650ad;
        text-align: center;
        color: #fff;
        font-size: .14rem;
        background: #1a396b;
      }
    }
  }

</style>
