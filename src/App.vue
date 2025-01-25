<script setup>
import { useUserStore } from './stores/index.js'

const userStore = useUserStore()
const a = ref(0)
</script>

<template>
  我是APP{{ a }}----{{ userStore.token }}

  <el-button type="success" @click="userStore.setToken('123')">
    Success
  </el-button>
</template>

<style scoped>

</style>
