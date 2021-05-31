<template>
  <div class="list-content">
    <table>
      <tr>
        <th v-for="(c, index) in cdata.config" :key="index" :class="{'text-center': c.align === 'center'}">{{ c.label }}</th>
      </tr>
      <tr v-for="(v, index) in cdata.value" :key="index">
        <td v-for="(it, i) in cdata.config" :key="i.field" :class="{'text-center': it.align === 'center'}">{{ v[it.field] }}</td>
      </tr>
    </table>
    <div class="button_muster" v-if="cdata.button_visible">
      <el-button style="background-color: #1d9cfe;border: 1px solid #1fefff;color:#fff;" size="small">中央区</el-button>
      <el-button style="background-color: #132345;border: 1px solid #1fefff;color:#1fefff" type="primary" size="small">南区</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  created() {
    console.log(this.cdata)
  }

}
</script>
<style lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.list-content {
  padding: .1rem;
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
  .button_muster{
    width: calc(100% - 6.8rem);
    margin: 0.2rem auto;
    .el-button{
      width: 1rem;
    }
    .first_button{
      background-color: #1d9cfe;
      border: 1px solid #1fefff;
    }
    .last_button{
      border: 1px solid #1fefff;
    }
  }
}

</style>
