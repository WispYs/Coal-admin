<template>
  <div v-if="!item.hidden && item.meta" class="nav-item">
    <div class="nav-item__title">
      <app-link :to="item.path">
        <span>{{ item.meta.title }}</span>
      </app-link>
      <div v-if="item.children && item.children.length > 0" class="item-extend">
        <div v-for="it in item.children" :key="it.path" class="extend-second">
          <app-link :to="it.path">
            <span class="extend-second__title">{{ it.meta.title }}></span>
          </app-link>
          <template v-if="it.children && it.children.length > 0">
            <div v-for="i in it.children" :key="i.path" class="extend-third">
              <app-link :to="i.path">
                <span class="extend-third__title">{{ i.meta.title }}</span>
              </app-link>
              <div v-if="i.children && i.children.length > 0" class="extend-fourth--wrapper">
                <div v-for="j in i.children" :key="j.path" class="extend-fourth">
                  <app-link :to="j.path">
                    <span>{{ j.meta.title }}</span>
                  </app-link>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLink from './Link'

export default {
  name: 'MenuItem',
  components: { AppLink },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {

  }
}
</script>
