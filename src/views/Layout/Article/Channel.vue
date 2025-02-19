<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { delChannelApi, getChannelListApi } from '@/api/article.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelDialog from '@/views/Layout/Article/components/ChannelDialog.vue'

const tableData = ref([])
const loading = ref(true)
const dialog = ref()

async function getChannelList() {
  loading.value = true
  const res = await getChannelListApi()
  loading.value = false
  tableData.value = res.data
}

getChannelList()
provide('getChannelList', getChannelList)

function onAdd() {
  dialog.value.openDialog()
}

function onEdit(row) {
  dialog.value.openDialog(row)
}

async function onDelete(id) {
  try {
    await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning', // 图标
    })

    await delChannelApi(id)
    ElMessage.success('删除成功')
    getChannelList()
    console.log('删除')
  } catch {} // 捕获 取消删除的异常 和 请求失败的异常
}
</script>

<template>
  <PageContainer class="channel" title="文章分类">
    <template #button>
      <el-button type="primary" @click="onAdd">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="tableData" height="100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="onEdit(row)"
            plain
            :icon="Edit"
            circle
          />
          <el-button
            type="danger"
            @click="onDelete(row.id)"
            plain
            :icon="Delete"
            circle
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <ChannelDialog ref="dialog"></ChannelDialog>
  </PageContainer>
</template>

<style scoped lang="scss">
.channel {
  :deep(td),
  :deep(th) {
    text-align: center;
  }
}
</style>
