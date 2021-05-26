<template>
  <div class="safety-standard">
    <div class="item-title">
      <p>安全生产标准化</p>
      <el-select v-model="workingFace" placeholder="请选择" class="title-select" popper-class="decision__select">
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="item-content">
      <div class="safety-card">
        <div v-for="(it,index) in safetyCard" :key="index" class="safety-card__item">
          <p>{{ it.value }}</p>
          <span>{{ it.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      workingFace: '1126(1)工作面',
      select: [
        { value: '1126(1)工作面', label: '1126(1)工作面' },
        { value: '1265(2)工作面', label: '1265(2)工作面' },
        { value: '1381(1)工作面', label: '1381(1)工作面' }
      ],
      safetyCard: [
        { value: '12587', label: '1级' },
        { value: '12587', label: '1级' },
        { value: '12587', label: '1级' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .safety-standard {
    height: 1.4rem;
    .safety-card {
      display: flex;
      justify-content: space-between;
      &__item {
        // width: 1.26rem;
        width: 1.3rem;
        height: .66rem;
        background: url('~@/assets/images/big-data_decition_safety.png') no-repeat bottom center;
        background-size: contain;
        text-align: center;
        padding-top: .1rem;
        p {
          font-size: .22rem;
          line-height: .3rem;
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
