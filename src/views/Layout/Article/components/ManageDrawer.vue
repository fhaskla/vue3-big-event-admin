<script setup>
import ManageSelect from '@/views/Layout/Article/components/ManageSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  addManageApi,
  getManageDrawerFormDataApi,
  updateManageApi,
} from '@/api/article.js'
import { baseURL } from '@/utils/request.js'
import { urlToFile } from '@/utils/image.js'

const drawerVisible = ref(false)
const isEdit = ref(false)
const defaultFormData = {
  title: '',
  content: '',
  cate_id: '',
  state: '',
  cover_img: null, // 发送给后端的图片数据，是一个 File 对象
}
// 初始值确定，保证不会出现表单初始值是空字符串而不是undefined
const formData = ref({ ...defaultFormData })
const form = ref()
// 实际显示的图片地址，是一个 url
const imgUrl = ref('')

async function openDrawer(row) {
  // 最开始会先挂载 Drawer 组件，但是其中的 form 组件还没有挂载
  // 所以 form 组件的 ref 还是 undefined
  // 第一次点击发布文章的时候，触发 openDrawer 方法，然后将 drawerVisible.value = true
  // 此时 form 组件挂载，form 组件挂载后就会一直存在
  drawerVisible.value = true
  if (row) {
    isEdit.value = true
    // row.id 是一条文章对应的 id
    const res = await getManageDrawerFormDataApi(row.id)

    // 将请求到的数据赋值给 formData,其中就包括后端需要的 id
    formData.value = { ...defaultFormData, ...res.data }

    // 修改实际显示的图片地址，是后端发送来的网络图片地址
    imgUrl.value = baseURL + res.data.cover_img
    // cover_img 现在是一个网络图片地址，要转化为后端需要的 File 对象
    // urlToFile 第一个参数是网络图片地址，第二个参数是 File 对象名称
    formData.value.cover_img = await urlToFile(imgUrl.value, imgUrl.value)
  } else {
    isEdit.value = false
    // 确保不会出现表单值为 undefined 的情况
    formData.value = { ...defaultFormData }
  }
}

// rule 是在 rules 里配置的表单项配置的规则对象, value 是表单项的值, callback 类似于 next
function contentValidate(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入文章内容'))
  } else {
    callback()
  }
}

// 这里 title 可以由 input 框触发 blur 校验，select 可以由 change 触发校验
// 其他的都得主动去触发校验函数
const rules = {
  title: { required: true, message: '请输入文章标题', trigger: 'blur' },
  cate_id: { required: true, message: '请选择文章分类', trigger: 'change' },
  cover_img: { required: true, message: '请上传封面图片' },
  content: { required: true, validator: contentValidate },
}

const quill = ref()

// 关闭抽屉
function closeDrawer() {
  drawerVisible.value = false
  imgUrl.value = '' // 清空本地图片地址
  form.value.resetFields() // 重置表单为初始值，清空错误校验信息
  quill.value.setHTML('') // 强制清空富文本编辑器内容
}

// 上传头像这里有有两重验证，一是选择的图片类型和大小验证
// 二是通过 form.value.validate() 实现的非空验证
function onSelect(uploadFile) {
  let isOk = true
  if (!uploadFile.raw.type.startsWith('image/')) {
    isOk = false
  }
  if (uploadFile.size > 1024 * 1024 * 2) {
    isOk = false
  }
  if (!isOk) return ElMessage.error('仅允许 2MB 以内的图片文件')

  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formData.value.cover_img = uploadFile.raw
  // 在选中图片后主动触发非空校验
  form.value.validateField('cover_img').catch(() => {})
}

const onSuccess = inject('onSuccess') // 父组件的 onSuccess 方法

async function onSubmit(state) {
  try {
    await form.value.validate()
    formData.value.state = state // 文件状态是 已发布 或 草稿

    const fd = new FormData()
    for (const key in formData.value) {
      fd.append(key, formData.value[key])
    }

    if (isEdit.value) {
      await updateManageApi(fd)
      ElMessage.success('编辑成功')
    } else {
      await addManageApi(fd)
      ElMessage.success('发布成功')
    }

    closeDrawer() // 关闭抽屉
    // 发布文章 会添加一个新的文章
    // 编辑文章 是修改原来的文章
    // isEdit 是一个 ref 对象
    onSuccess(isEdit.value)
  } catch {}
}

defineExpose({ openDrawer })
</script>

<template>
  <el-drawer
    v-model="drawerVisible"
    size="50%"
    :title="isEdit ? '编辑文章' : '发布文章'"
    :before-close="closeDrawer"
  >
    <!-- 这里传递的 id 是表格数据行的 id，而不是 分类id -->
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ManageSelect v-model="formData.cate_id" width="100%"></ManageSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :on-change="onSelect"
          :show-file-list="false"
          accept="image/*"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="quill"
            v-model:content="formData.content"
            contentType="html"
            theme="snow"
            @blur="form.validateField('content').catch(() => {})"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('已发布')">发布</el-button>
        <el-button type="info" @click="onSubmit('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: 0;
    transition: var(--el-transition-duration-fast);
  }

  :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

//图片是行内块元素，底部会有空隙
.avatar {
  display: block;
  width: 178px;
  height: 178px;
}

// 富文本编辑器样式
.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
