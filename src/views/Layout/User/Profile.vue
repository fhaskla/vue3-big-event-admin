<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores/index.js'
import { updateUserInfoApi } from '@/api/user.js'
import FormBody from '@/views/Layout/User/components/FormBody.vue'

const userStore = useUserStore()
const isLoading = ref(false)
const formData = ref({ ...userStore.userInfo })
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称为2到10个非空字符',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入有效的邮箱地址',
      trigger: 'blur',
    },
  ],
}
const form = ref()

async function onSubmit() {
  try {
    isLoading.value = true
    await form.value.validate()
    await updateUserInfoApi(formData.value)
    await userStore.setUserInfo()
    isLoading.value = false
    ElMessage.success('修改成功')
  } catch {
    isLoading.value = false
  }
}
</script>

<template>
  <PageContainer title="基本资料">
    <FormBody>
      <el-form
        label-width="100px"
        :model="formData"
        :rules="rules"
        style="width: 600px"
        ref="form"
      >
        <el-form-item label="登录名称" prop="username">
          <el-input
            v-model="formData.username"
            disabled
            size="large"
            @keyup.enter="onSubmit"
          />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input
            v-model="formData.nickname"
            size="large"
            @keyup.enter="onSubmit"
          />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input
            v-model="formData.email"
            size="large"
            @keyup.enter="onSubmit"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <div class="button-center">
            <el-button type="primary" @click="onSubmit" :loading="isLoading">
              提交修改
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </FormBody>
  </PageContainer>
</template>
<style scoped>
.button-center {
  width: 100%;
  text-align: center;
}
</style>
