<template>
  <div class="page-container">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="事故列表">
        <el-select v-model="form.accident" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        accident: ''
      }
    }
  }
}
</script>

<style>

</style>
