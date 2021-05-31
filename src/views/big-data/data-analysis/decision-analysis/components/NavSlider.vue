<template>
  <div class="nav-slider">
    <div
      v-for="(it,index) in nav"
      :key="index"
      :class="['slider-item', it.className]"
      :title="it.title"
      :style="{left: it.left,top: it.top}"
    >{{ it.title }}</div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      nav: [
        { title: '安全管理', url: '', className: 'blue-item', left: 0, top: 3 },
        { title: '防治水', url: '', className: 'blue-item', left: 1, top: 1.46 },
        { title: 'AI分析', url: '', className: 'blue-item', left: 2, top: 0.78 },
        { title: '安全管理', url: '', className: 'purple-item', left: 3, top: 0.35 },
        { title: '安全管理', url: '', className: 'blue-item', left: 4, top: 0 },
        { title: '安全管理', url: '', className: 'blue-item', left: 5, top: 0 },
        { title: '安全管理', url: '', className: 'blue-item', left: 6, top: 0.35 },
        { title: 'AI分析', url: '', className: 'orange-item', left: 7, top: 0.78 },
        { title: '防治水', url: '', className: 'blue-item', left: 8, top: 1.46 },
        { title: '安全管理', url: '', className: 'blue-item', left: 9, top: 3 },
        { title: '防治水', url: '', className: 'blue-item', left: 8, top: 4.54 },
        { title: 'AI分析', url: '', className: 'blue-item', left: 7, top: 5.22 },
        { title: '安全管理', url: '', className: 'blue-item', left: 6, top: 5.65 },
        { title: '安全管理', url: '', className: 'green-item', left: 5, top: 6 },
        { title: '安全管理', url: '', className: 'blue-item', left: 4, top: 6 },
        { title: '安全管理', url: '', className: 'blue-item', left: 3, top: 5.65 },
        { title: 'AI分析', url: '', className: 'blue-item', left: 2, top: 5.22 },
        { title: '防治水', url: '', className: 'red-item', left: 1, top: 4.54 }
      ]
    }
  },
  mounted() {
    this.__initSlider()
  },
  methods: {
    __initSlider() {
      this.nav.forEach((it, index) => {
        const leftSpace = 0.82
        const topSpace = 0.3
        it.left = `${it.left * leftSpace}rem`
        it.top = `${it.top * topSpace + 0.1}rem`
      })
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .nav-slider {
    position: relative;
    width: 8rem;
    height: 100%;
    margin: 0 auto;
    .slider-item {
      @include ellipsis(.7rem);
      position: absolute;
      top: 0;
      left: 0;
      width: .7rem;
      height: .7rem;
      line-height: .7rem;
      border-radius: 50%;
      background: #0d1935;
      color: #f9f9f9;
      font-size: .12rem;
      text-align: center;
      cursor: pointer;
      transition: all .5s;
      -webkit-transition: all .5s;
      &.blue-item {
        border: 1px solid #1d93f6;
        box-shadow: 0 0 .15rem #1d93f6 inset;
      }
      &.red-item {
        border: 1px solid #eb294b;
        box-shadow: 0 0 .15rem #eb294b inset;
      }
      &.green-item {
        border: 1px solid #16dfcb;
        box-shadow: 0 0 .15rem #16dfcb inset;
      }
      &.orange-item {
        border: 1px solid #f0a717;
        box-shadow: 0 0 .15rem #f0a717 inset;
      }
      &.purple-item {
        border: 1px solid #ca5fef;
        box-shadow: 0 0 .15rem #ca5fef inset;
      }
      &:hover {
        transform: scale(1.3);
        -ms-transform:scale(1.3);
        -moz-transform:scale(1.3);
        -webkit-transform:scale(1.3);
        -o-transform:scale(1.3);
      }
    }
  }

</style>
