<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'
import { updateAvatarApi } from '@/api/user.js'
import FormBody from '@/views/Layout/User/components/FormBody.vue'

const userStore = useUserStore()
const imageUrl = ref(userStore.userInfo.user_pic) // 本地显示的图片
const imageFileReader = ref(null) // 上传远程的图片
const upload = ref()
const isLoading = ref(false)

function onSelect(uploadFile) {
  let isOk = true
  if (!uploadFile.raw.type.startsWith('image/')) {
    isOk = false
  }
  if (uploadFile.size > 1024 * 1024 * 5) {
    isOk = false
  }
  if (!isOk) return ElMessage.error('仅允许 5MB 以内的图片文件')

  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  const fr = new FileReader()
  fr.readAsDataURL(uploadFile.raw)
  fr.onload = () => {
    imageFileReader.value = fr.result
  }
}

async function onSubmit() {
  isLoading.value = true
  await updateAvatarApi(imageFileReader.value)
  await userStore.setUserInfo()
  isLoading.value = false
  ElMessage.success('更换头像成功')
}
</script>

<template>
  <PageContainer title="更换头像">
    <FormBody>
      <el-upload
        ref="upload"
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="onSelect"
        :auto-upload="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>

      <div style="margin-top: 20px">
        <!--在 click 的时候 upload 已经挂载了-->
        <el-button
          @click="upload.$el.querySelector('input[type=file]').click()"
          :icon="Plus"
          type="primary"
        >
          选择图片
        </el-button>
        <el-button
          type="success"
          :disabled="!imageFileReader"
          @click="onSubmit"
          :icon="Upload"
          :loading="isLoading"
        >
          更换头像
        </el-button>
      </div>
    </FormBody>
  </PageContainer>
</template>

<style scoped>
.avatar-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  width: 250px;
  height: 250px;
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 250px;
  text-align: center;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
