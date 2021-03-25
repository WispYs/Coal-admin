<template>
  <div @click="handelHeadbar(index)">
    <item-link :to="path">
      <span :class="isCurrentMenu(path) ? 'active' : ''">{{ title }}</span>
    </item-link>
  </div>
</template>
<script>
import ItemLink from './Link'
import { mapGetters } from 'vuex'

export default {
  components: { ItemLink },
  props: {
    index: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes' // state 里存储的路由配置
    ])
  },
  methods: {
    handelHeadbar(index) {
      console.log(index)
      // const sidebarRoutes = this.permission_routes[index].children || []
      // this.$store.dispatch('headbar/initSidebarRoutes', sidebarRoutes)
    },
    isCurrentMenu(path) {
      const routePath = this.$route.path
      return routePath.includes(path)
    }
  }

}
</script>
<style lang="scss">
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/variables.scss';
// .router-link-active {
//   span {
//     @include primaryColor($primaryColor)
//   }
// }

</style>
