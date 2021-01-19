<template>
  <div>
    <el-dropdown class="avatar-wrapper" trigger="click">
      <div class="avatar-content">
        <img src="@/assets/images/avatar.jpg" class="user-avatar">
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item>个人资料</el-dropdown-item>
        <el-dropdown-item @click.native="logout">
          <span style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Avatar',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    logout() {
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>
