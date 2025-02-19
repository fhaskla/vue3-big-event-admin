<script setup>
import {
  ArrowDown,
  CaretBottom,
  Crop,
  EditPen,
  Management,
  Position,
  SwitchButton,
  User,
  UserFilled,
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores/index.js'
import router from '@/router/index.js'

const userStore = useUserStore()
userStore.setUserInfo()

function onCommand(command) {
  if (command === 'logout') {
    ElMessageBox.confirm('你确认要退出大事件吗?', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning', // 图标
    })
      .then(() => {
        userStore.removeToken()
        userStore.removeUserInfo()
        router.push('/login')
      })
      .catch(() => {})
  } else {
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <el-container class="layout">
    <el-aside width="200px">
      <div class="logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon>
            <Management />
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Position />
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>修改密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          黑马程序员：<strong>{{
            userStore.userInfo.nickname || userStore.userInfo.username
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="onCommand">
          <span class="el-dropdown-link">
            <el-avatar :src="userStore.userInfo.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-item command="profile" :icon="User">
              基本资料
            </el-dropdown-item>
            <el-dropdown-item command="avatar" :icon="Crop">
              更换头像
            </el-dropdown-item>
            <el-dropdown-item command="password" :icon="EditPen">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item command="logout" :icon="SwitchButton">
              退出登录
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view #default="{ Component }">
          <Transition name="fade-slide">
            <Component :is="Component" />
          </Transition>
        </router-view>
      </el-main>
      <el-footer>大事件 ©2025 Created by 天才熊猫君</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout {
  height: 100vh;
}

.el-aside {
  background-color: #232323;
  scrollbar-width: none;

  .logo {
    height: 120px;
    background: url('@/assets/logo2.png') no-repeat center / 120px auto;
  }

  .el-menu {
    border: none;
  }
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    outline: 0;

    .el-icon {
      color: #999;
      margin-left: 10px;
    }
  }
}

.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
}
</style>
