<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <slot name="button"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped lang="scss">
.el-card {
  display: flex;
  flex-direction: column;
  height: 100%;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  //让 el-card__body 占据剩余高度
  :deep(.el-card__body) {
    flex: 1;
    overflow: auto;
  }
}
</style>
