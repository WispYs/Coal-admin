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
    <div class="item-content" />
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
      ]
    }
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

  }

</style>
