<script setup>
import { getChannelListApi } from '@/api/article.js'

// cate_id 是 分类id
const cate_id = defineModel({
  type: [String, Number],
})

const { width } = defineProps({
  width: {
    type: String,
    default: '220px',
  },
})
const selectData = ref([])

// 获取分类列表
async function getChannelList() {
  const res = await getChannelListApi()
  selectData.value = res.data
}

getChannelList()
</script>

<template>
  <!-- 这里的 option.id 是分类 id -->
  <el-select :style="{ width }" v-model="cate_id">
    <el-option
      v-for="option in selectData"
      :key="option.id"
      :label="option.cate_name"
      :value="option.id"
    ></el-option>
  </el-select>
</template>

<style scoped></style>
