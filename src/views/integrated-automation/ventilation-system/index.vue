<template>
  <div style="height:100%">
    <iframe src="http://121.36.150.50:18081/smartFactory/index.html" style="width:100%; height:100%;" scrolling="no" id="bdIframe" frameborder="0"></iframe>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    created() {
      this.$store.dispatch('sidebar/toggleSideBar')
    }
  }
</script>

<style>
</style>
