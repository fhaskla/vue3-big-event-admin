<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Clock, Delete, Edit, FolderOpened } from '@element-plus/icons-vue'
import ManageSelect from '@/views/Layout/Article/components/ManageSelect.vue'
import {
  deleteManageApi,
  getManageDrawerFormDataApi,
  getManageListApi,
} from '@/api/article.js'
import { formatDate } from '@/utils/day.js'
import ManageDrawer from '@/views/Layout/Article/components/ManageDrawer.vue'
import { baseURL } from '@/utils/request.js'

const loading = ref(true)
const tableData = ref([]) // 表格文章数据
const total = ref(0) // 文章总条数

// 获取文章列表
async function getManageList(params) {
  loading.value = true
  const res = await getManageListApi(params)
  tableData.value = res.data
  total.value = res.total
  loading.value = false
}

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: null,
  state: '',
})
getManageList(params.value)

// 改变页容量时，重新请求数据
function onSizeChange(val) {
  params.value.pagenum = 1
  params.value.pagesize = val
  getManageList(params.value)
}

// 改变当前页码时，重新请求数据
function onCurrentChange(val) {
  params.value.pagenum = val
  getManageList(params.value)
}

// 点击搜索按钮，下拉框改变时，params 的 cate_id 和 state 变化了，重新请求数据
function onSearch() {
  params.value.pagenum = 1
  getManageList(params.value)
}

// 点击重置按钮，重新请求数据
function onReset() {
  params.value.pagenum = 1
  params.value.cate_id = null
  params.value.state = ''
  getManageList(params.value)
}

const drawer1 = ref()

function onAdd() {
  drawer1.value.openDrawer()
}

function onEdit(row) {
  drawer1.value.openDrawer(row)
}

const drawer2 = ref(false)
const currentArticle = ref({})

async function onShow(row) {
  const res = await getManageDrawerFormDataApi(row.id)
  currentArticle.value = res.data
  drawer2.value = true
}

async function onDelete(row) {
  try {
    await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await deleteManageApi(row.id)
    await getManageList(params.value)
    ElMessage.success('删除成功')
  } catch {}
}

provide('onSuccess', (isEdit) => {
  if (isEdit) {
  } else {
    // 新添加的文章，会出现在最后一页，所以要跳转到最后一页
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
    console.log(params.value.pagenum)
  }
  getManageList(params.value)
})
</script>

<template>
  <PageContainer title="文章管理" class="manage">
    <template #button>
      <el-button type="primary" @click="onAdd">发布文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类">
        <ManageSelect v-model="params.cate_id"></ManageSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 220px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" height="calc(100% - 94px)">
      <el-table-column label="文章标题" width="300">
        <template #default="{ row }">
          <el-link type="primary" :underline="false" @click="onShow(row)"
            >{{ row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        align="center"
        prop="cate_name"
      ></el-table-column>
      <el-table-column label="发表时间" align="center">
        <template #default="{ row }">
          {{ formatDate(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template #default="{ row }">
          <el-tag :type="row.state === '已发布' ? 'success' : 'info'"
            >{{ row.state }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            plain
            :icon="Edit"
            circle
            @click="onEdit(row)"
          />
          <el-button
            type="danger"
            plain
            :icon="Delete"
            circle
            @click="onDelete(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :total="total"
      background
      size="small"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="padding: 20px 12px 0"
    ></el-pagination>
    <ManageDrawer ref="drawer1"></ManageDrawer>
    <el-drawer v-model="drawer2" title="文章预览" size="50%">
      <div class="article-preview">
        <!-- 封面图片 -->
        <div class="cover" v-if="currentArticle.cover_img">
          <img :src="baseURL + currentArticle.cover_img" alt="封面" />
        </div>

        <!-- 文章标题 -->
        <h1 class="title">{{ currentArticle.title }}</h1>

        <!-- 文章元信息 -->
        <div class="meta">
          <div class="meta-left">
            <span class="category">
              <el-icon><FolderOpened /></el-icon>文章分类：
              {{ currentArticle.cate_name }}
            </span>
            <span class="publish-date">
              <el-icon><Clock /></el-icon>发布时间：
              {{ formatDate(currentArticle.pub_date) }}
            </span>
          </div>
          <el-tag
            :type="currentArticle.state === '已发布' ? 'success' : 'info'"
          >
            {{ currentArticle.state }}
          </el-tag>
        </div>

        <!-- 文章内容 -->
        <div class="content" v-html="currentArticle.content"></div>
      </div>
    </el-drawer>
  </PageContainer>
</template>

<style scoped lang="scss">
.article-preview {
  padding: 20px;
  height: 100%;
  overflow-y: auto;

  .cover {
    margin-bottom: 20px;

    img {
      width: 200px;
      height: 140px;
      border-radius: 8px;
      display: block;
      margin: 0 auto;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .title {
    font-size: 26px;
    margin: 0 0 15px 0;
    color: #1a1a1a;
    line-height: 1.4;
    font-weight: 600;
    text-align: center;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    .meta-left {
      display: flex;
      gap: 25px;

      span {
        display: inline-flex;
        align-items: center;
        font-size: 14px;
        color: #666;

        .el-icon {
          margin-right: 6px;
          font-size: 16px;
          color: #999;
        }
      }
    }

    .el-tag {
      padding: 0 12px;
      height: 32px;
      line-height: 30px;
    }
  }

  .content {
    font-size: 16px;
    line-height: 1.8;
    color: #444;

    :deep {
      p {
        margin: 1.2em 0;
      }

      img {
        max-width: 100%;
        height: auto;
        margin: 20px 0;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.el-link {
  width: 100%;
  justify-content: left;
  height: 32px;
}
</style>
