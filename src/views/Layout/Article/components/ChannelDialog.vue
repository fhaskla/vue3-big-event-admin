<script setup>
import { addChannelApi, updateChannelApi } from '@/api/article.js'

const getChannelList = inject('getChannelList') // 刷新列表
const dialogVisible = ref(false)
const isEdit = ref(false)
const formData = ref({
  cate_name: '',
  cate_alias: '',
  id: null,
})

function openDialog(row) {
  dialogVisible.value = true

  if (row) {
    isEdit.value = true
    // row 是一个响应式对象，这里去掉响应式
    formData.value = { ...row }
  } else {
    isEdit.value = false
    formData.value = {}
  }
}

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur',
    },
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,10}$/,
      message: '分类别名必须是1-10位的字母数字',
      trigger: 'blur',
    },
  ],
}
const form = ref()

async function onSubmit() {
  try {
    await form.value.validate()

    if (isEdit.value) {
      await updateChannelApi(formData.value)
      ElMessage.success('编辑成功')
    } else {
      await addChannelApi(formData.value)
      ElMessage.success('添加成功')
    }

    dialogVisible.value = false
    getChannelList()
  } catch {}
}

defineExpose({
  openDialog,
})
</script>

<template>
  <!-- 当用户点击对话框的关闭按钮或外部区域时, 会触发 dialogVisible 的更新 -->
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formData.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formData.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-form-item {
  padding: 0 30px;
}
</style>
