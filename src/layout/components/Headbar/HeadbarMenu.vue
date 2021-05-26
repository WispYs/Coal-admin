<template>
  <div class="headbar-menu">
    <i class="el-icon-s-fold headbar-menu__icon" :class="sidebar_status ? 'reverse' : ''" @click="toggleSideBar" />
    <template v-for="(item,index) in routes">
      <div v-if="!item.hidden && item.meta && item.meta.important" :key="item.path" class="headbar-menu__item">
        <headbar-menu-item :title="item.meta.title" :path="item.path" :index="index" />
      </div>
    </template>
  </div>
</template>
<script>
import HeadbarMenuItem from './HeadbarMenuItem'
import { mapGetters } from 'vuex'
export default {
  components: { HeadbarMenuItem },
  props: {
    routes: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'sidebar_status'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('sidebar/toggleSideBar')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixin.scss';
.headbar-menu {
  @include clearfix;
  position: relative;
  float: left;
  height: $headBarHeight;
  line-height: $headBarHeight;
  width: calc(100% - 500px);
  overflow: hidden;
  // display: flex;
  // justify-content: space-between;
  &__icon {
    float: left;
    font-size: 20px;
    width: 20px;
    height: 20px;
    margin-top: calc((#{$headBarHeight} - 20px)/2);
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s;
    &.reverse {
      transform: rotate(180deg);
    }
  }
  &__item {
    float: left;
    padding: 0 20px;

    &:hover {
      @include primaryColor($primaryColor);
    }
    &.active {
      @include primaryColor($primaryColor);
    }
  }

}
@media screen and (max-width: 1440px) {
  .headbar-menu {
    display: flex;
    justify-content: space-between;
    &__item {
      float: none;
      padding: 0;
    }
  }
}
</style>
<style lang="scss">
@import '~@/assets/styles/theme.scss';
@import '@/assets/styles/variables.scss';
.headbar-menu__item {
  a {
    display: block;
    position: relative;
    &.router-link-active {
      &::after {
        content: '';
        width: calc(100% + 40px);
        height: 5px;
        position: absolute;
        bottom: 0;
        left: -20px;
        @include primaryBg($primaryColor);
      }
    }
  }
}

</style>
