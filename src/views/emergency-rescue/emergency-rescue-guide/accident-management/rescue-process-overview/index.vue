<template>
  <div class="wrapper">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="事故列表">
        <el-select v-model="form.accident" style="width: 300px;" placeholder="请选择活动区域">
          <el-option v-for="item in form.options" :key="item.yjjyAccidentManageId" :label="item.content" :value="item.yjjyAccidentManageId" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider />

    <div v-if="selectItem" class="card">
      {{ selectItem.accidentTime }}

      <el-card style="margin-top: 10px;" shadow="always">
        {{ selectItem.node }}
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getAccountOverview
} from '@/api/emergency-rescue'
export default {
  name: 'RescueProcessOverview',
  data() {
    return {
      form: {
        accident: '',
        options: []
      }
    }
  },
  computed: {
    selectItem() {
      return this.form.options.find(o => o.yjjyAccidentManageId === this.form.accident)
    }
  },
  created() {
    this.__initOptions()
  },
  methods: {
    __initOptions() {
      getAccountOverview().then(res => {
        this.form.options = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute !important;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  background: #fff;
  z-index: 10;
  padding-top: 20px;
}
.card {
  width: 500px;
  margin: 0 auto;
}
</style>
