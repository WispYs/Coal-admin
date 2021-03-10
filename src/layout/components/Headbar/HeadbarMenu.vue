<template>
  <div class="headbar-menu">
    <template v-for="(item,index) in routes">
      <div v-if="!item.hidden && item.meta && item.meta.important" :key="item.path" class="headbar-menu__item">
        <headbar-menu-item :title="item.meta.title" :path="item.path" :index="index" />
      </div>
    </template>
    <i class="el-icon-menu headbar-menu__icon" />
  </div>
</template>
<script>
import HeadbarMenuItem from './HeadbarMenuItem'
export default {
  components: { HeadbarMenuItem },
  props: {
    routes: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixin.scss';
.headbar-menu {
  position: relative;
  height: 50px;
  line-height: 50px;
  padding-right: 100px;
  display: flex;
  justify-content: space-between;
  &__item {
    &:hover {
      color: $primaryColor;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
