<template>
  <div class="equip-consume">
    <div class="item-title">
      <p>设备能耗</p>
      <el-select v-model="equipData" placeholder="请选择" class="title-select" popper-class="decision__select">
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="item-content">
      <div class="consume-card">
        <div class="consume-num">
          <span
            v-for="(it,index) in consumeValue"
            :key="index"
            :class="it.type === 'number' ? 'is-num': ''"
          >{{ it.value }}</span>
        </div>
        <div class="consume-unit">{{ consumeData.unit }}</div>
        <div class="consume-tag">
          <img src="@/assets/images/big-data_decition_consume_icon.png" alt="">
          <span>{{ consumeData.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      equipData: '主井提升机',
      select: [
        { value: '主井提升机', label: '主井提升机' },
        { value: '副井提升机', label: '副井提升机' }
      ],
      consumeData: {
        value: '2.92124',
        unit: 'kwh/T.ah',
        title: '二级能耗'
      }
    }
  },
  computed: {
    consumeValue() {
      // 格式化数据，处理成array用于页面遍历渲染
      const consumeValue = []

      if (this.consumeData && this.consumeData.value) {
        const val = this.consumeData.value
        val.split('').forEach(it => {
          if (!isNaN(it)) {
            consumeValue.push({
              type: 'number',
              value: it
            })
          } else {
            consumeValue.push({
              type: 'dot',
              value: it
            })
          }
        })
      }
      return consumeValue
    }
  },
  mounted() {
    console.log(this.consumeValue)
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .equip-consume {
    display: inline-block;
    width: calc(50% - .1rem);
    height: 2.3rem;
    margin-right: .2rem;
    .consume-card {
      margin: 0 auto;
      width: 4.2rem;
      height: 1.7rem;
      padding-top: .35rem;
      text-align: center;
      color: #fff;
      background: url('~@/assets/images/big-data_decition_consume.png') no-repeat;
      background-size: cover;
      .consume-num {
        font-size: .3rem;
        margin-bottom: .05rem;
        letter-spacing: 2px;
        text-shadow: 0px 0px 10px #fff;
        font-weight: bold;
        span {
          margin-right: .06rem;
          &.is-num {
            border: .02rem solid #02b1f6;
            padding: .06rem;
            border-radius: 6px;
            box-shadow: 0 0 5px #02b1f6 inset;
          }
        }
      }
      .consume-unit {
        font-size: .16rem;
        margin-bottom: .05rem;
      }
      .consume-tag {
        @include clearfix;
        width: 1rem;
        padding: .06rem;
        margin: 0 auto;
        background: #faad14;
        border-radius: 4px;
        img {
          float: left;
          width: .2rem;
          height: .2rem;
          margin-right: .06rem;
        }
        span {
          float: left;
          font-size: .14rem;
        }
      }
    }
  }

</style>
