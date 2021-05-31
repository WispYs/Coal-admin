<template>
  <component :is="type" v-bind="linkProps(to, target)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      // 外部链接用 a 标签跳转
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to, target) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      console.log(to, target)
      return {
        to: to,
        target: target
      }
    }
  }
}
</script>
