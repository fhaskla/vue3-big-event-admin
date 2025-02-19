<script setup>
import { loginApi, registerApi } from '@/api/user.js'
import { Lock, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'
import router from '@/router/index.js'

const isLogin = ref(true)
const formData = reactive({
  username: '',
  password: '',
  repassword: '',
})

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{1,10}$/i,
      message: '用户名必须是1-10位大小写字母和数字',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur',
    },
  ],
  repassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur',
    },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur',
    },
    {
      validator(rule, value, callback) {
        if (value !== formData.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
    },
  ],
}
const form = ref()

async function onRegister() {
  try {
    await form.value.validate()
    await registerApi(formData)
    ElMessage.success('注册成功')
    isLogin.value = true
  } catch {
    // 不用处理 form.value.validate 拒绝产生的 await 异常是因为表单验证失败会有提示
    // 不用处理 Api 失败情况是因为响应拦截器处理了所有的请求失败情况
  }
}

const userStore = useUserStore()

async function onLogin() {
  try {
    form.value.validate() // 这里没有校验 repassword，因为没有绑定 repassword 的 prop
    const res = await loginApi(formData)
    userStore.setToken(res.token)

    // 新增记住我逻辑
    if (rememberMe.value) {
      localStorage.setItem('rememberedUsername', formData.username)
    } else {
      localStorage.removeItem('rememberedUsername')
    }

    ElMessage.success('登录成功')
    router.push('/')
  } catch {
    // 不用处理 form.value.validate 拒绝产生的 await 异常是因为表单验证失败会有提示
    // 不用处理 Api 失败情况是因为响应拦截器处理了所有的请求失败情况
  }
}

const rememberMe = ref(false)

onMounted(() => {
  const savedUsername = localStorage.getItem('rememberedUsername')
  if (savedUsername) {
    formData.username = savedUsername
    rememberMe.value = true
  }
})

watch(isLogin, () => {
  formData.username = ''
  formData.password = ''
  formData.repassword = ''
})
</script>

<template>
  <el-row class="login">
    <el-col :span="12" class="bg" />
    <el-col :span="6" :offset="3" class="form">
      <el-form
        v-if="isLogin"
        ref="form"
        :model="formData"
        :rules="rules"
        size="large"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
            @keyup.enter="onLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            :prefix-icon="Lock"
            type="password"
            show-password
            placeholder="请输入密码"
            @keyup.enter="onLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="onLogin" class="button" type="primary">
            登 录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isLogin = !isLogin">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>

      <el-form v-else ref="form" :model="formData" :rules="rules" size="large">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
            @keyup.enter="onRegister"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="onRegister"
          />
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formData.repassword"
            :prefix-icon="Lock"
            placeholder="请再次输入密码"
            @keyup.enter="onRegister"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click="onRegister">
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isLogin = !isLogin">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.login {
  height: 100vh;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    .el-form {
      width: 100%;

      .button {
        width: 100%;
      }
    }
  }
}
</style>
