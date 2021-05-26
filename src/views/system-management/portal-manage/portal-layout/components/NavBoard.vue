<template>
  <div class="swiper-content">
    <el-carousel :indicator-position="collectMenu.length > 1 ? 'outside' : 'none'" arrow="never" :autoplay="false">
      <el-carousel-item v-for="(item,index) in collectMenu" :key="index">
        <div class="nav-board">
          <div v-for="it in item" :key="it.title" class="nav-board__item">
            <div class="item-icon">
              <img :src="it.icon" alt="">
            </div>
            <span class="item-tit" :title="it.title">{{ it.title }}</span>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: {
    // 资源数据 - 快捷导航
    resourceData: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      collectMenu: []
    }
  },
  watch: {
    resourceData: {
      handler(val) {
        const collectMenu = []
        val.forEach((it, index) => {
          collectMenu.push({
            ...JSON.parse(it.menuResource),
            icon: require(`@/assets/images/nav_icon_${index % 8 + 1}.png`)
          })
        })
        this.groupCollectMenu(collectMenu)
      },
      immediate: true
    }
  },
  created() {
    // const collectMenu = [
    //   { title: '任务调度', icon: require('@/assets/images/nav_icon_1.png') },
    //   { title: '大数据分析', icon: require('@/assets/images/nav_icon_2.png') },
    //   { title: 'GIS一张图', icon: require('@/assets/images/nav_icon_3.png') },
    //   { title: '消息管理', icon: require('@/assets/images/nav_icon_4.png') },
    //   { title: '一通三防', icon: require('@/assets/images/nav_icon_5.png') },
    //   { title: '生产调度', icon: require('@/assets/images/nav_icon_6.png') },
    //   { title: '机电运输', icon: require('@/assets/images/nav_icon_1.png') },
    //   { title: '采集管理', icon: require('@/assets/images/nav_icon_2.png') }
    // ]
  },
  methods: {
    groupCollectMenu(collectMenu) {
      // 将快捷导航数组按每组8个分割
      const newArr = [] // 存储数组
      const groupNum = 8 // 每组数量
      let mIndex = 0 // 记录index
      collectMenu.forEach((it, index) => {
        if (index % groupNum === 0 && index !== 0) {
          newArr.push(collectMenu.slice(mIndex, index))
          mIndex = index
        }
        if ((index + 1) === collectMenu.length) {
          newArr.push(collectMenu.slice(mIndex, (index + 1)))
        }
      })
      console.log(newArr)
      this.collectMenu = newArr
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

.nav-board {
  padding:10px 20px;
  overflow: hidden;
  &__item {
    float: left;
    width: calc((100% - 45px)/4);
    margin-right: 15px;
    text-align: center;
    margin-bottom: 10px;
    .item-icon {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: $blueColor;
    }
    .item-tit {
      display: block;
      font-size: 13px;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

  }
  &__item:nth-of-type(4n) {
    margin-right: 0;

  }
}

</style>
