<template>
  <div>
    <k-form-design
      title="表单设计器"
      :show-head="false"
      :toolbars="['save', 'preview', 'importJson', 'exportJson', 'reset']"
      @save="handleSave"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleSave(data) {
      console.log(JSON.parse(data))
    }
  }
}
</script>

<style></style>
