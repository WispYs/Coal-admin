<template>
  <div class="break-rule">
    <div class="item-title has-sum">
      <p>违章行为</p>
      <div class="title-sum">总数：218</div>
    </div>
    <div class="item-content break-rule__con">
      <table>
        <tr>
          <th v-for="(c, index) in data.config" :key="index" :class="{'text-center': c.align === 'center'}">{{ c.label }}</th>
        </tr>
        <tr v-for="(v, index) in data.value" :key="index">
          <td v-for="(it, i) in data.config" :key="i.field" :class="{'text-center': it.align === 'center'}">{{ v[it.field] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .break-rule {
    float: left;
    width: 6rem;
    height: 100%;
    background: url('~@/assets/images/big-data_wisdom_bg3.png') no-repeat;
    background-size: cover;
    &__con {
      table {
        width: 100%;
        line-height: .4rem;
        text-align: left;
        tr {
          border-bottom: 1px solid #132345;
          background: #0b1938;
        }
        th {
          color: #fff;
          font-size: .16rem;
          line-height: .46rem;
          background: #22305b;
          padding: 0 .1rem;
          min-width: 62px;
          &.text-center {
            text-align: center;
          }
        }
        td {
          color: #8996c1;
          font-size: .15rem;
          padding: 0 .1rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          &.text-center {
            text-align: center;
          }
        }
      }
    }
  }

</style>
