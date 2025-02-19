<script setup></script>

<template>
  <div class="form-body">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
//:deep(.el-form-item) 是让 el-form-item 垂直居中，label 和 input 对齐
//overflow: auto; scrollbar-width: none; 实现允许滚动，滚动条隐藏的效果
.form-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  scrollbar-width: none;

  :deep(.el-form-item) {
    align-items: center;
  }
}
</style>
