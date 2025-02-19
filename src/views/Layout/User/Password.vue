<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { updatePasswordApi } from '@/api/user.js'
import { useUserStore } from '@/stores/index.js'
import router from '@/router/index.js'
import FormBody from '@/views/Layout/User/components/FormBody.vue'

const userStore = useUserStore()
const formData = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})

const rules = ref({
  old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '长度在6到16个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === formData.value.old_pwd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  re_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.new_pwd) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})
const form = ref()
const isLoading = ref(false)

async function onSubmit() {
  try {
    isLoading.value = true
    await form.value.validate()
    await updatePasswordApi(formData.value)
    isLoading.value = false
    userStore.removeUserInfo()
    userStore.removeToken()
    router.push('/login')
    ElMessage.success('修改密码成功')
  } catch {
    isLoading.value = false
  }
}

function onReset() {
  form.value.resetFields()
}
</script>

<template>
  <PageContainer title="修改密码">
    <FormBody>
      <el-form
        :model="formData"
        :rules="rules"
        label-width="100px"
        style="width: 600px"
        ref="form"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-input
            v-model="formData.old_pwd"
            type="password"
            show-password
            size="large"
            @keyup.enter="onSubmit"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input
            v-model="formData.new_pwd"
            type="password"
            show-password
            size="large"
            @keyup.enter="onSubmit"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="re_pwd">
          <el-input
            v-model="formData.re_pwd"
            type="password"
            show-password
            size="large"
            @keyup.enter="onSubmit"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <div class="button-center">
            <el-button type="primary" @click="onSubmit" :loading="isLoading"
              >提交修改</el-button
            >
            <el-button @click="onReset">重置</el-button>
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
