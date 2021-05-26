<template>
  <div class="big-data">
    <top-nav :nav-menu="nav" />
    <div class="big-data__content">
      <router-view />
    </div>
  </div>
</template>
<script>
import TopNav from '../components/TopNav'

export default {
  components: { TopNav },
  data() {
    return {
      nav: [
        { title: '安全管理', url: '/big-data-analysis/specific-analysis/safety-management' },
        { title: '智慧大脑', url: '/big-data-analysis/specific-analysis/wisdom-brain' },
        { title: '监测监控', url: '/big-data-analysis/specific-analysis/monitor-inspect' },
        { title: '应急指挥', url: '/big-data-analysis/specific-analysis/emergency-analysis' },
        { title: '调度专题', url: '/big-data-analysis/specific-analysis/schedule-analysis' },
        { title: '经营专题', url: '/big-data-analysis/specific-analysis/business-analysis' }

      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';

.big-data {
  width: 100%;
  height:100%;
  background: url('~@/assets/images/big-data_banner.jpg') no-repeat;
  background-size: cover;
  position: relative;
  overflow: auto;
  &__content {
    padding: 1.25rem .3rem .3rem;
  }
}

</style>
