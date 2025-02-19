import request from '@/utils/request.js'

export const getChannelListApi = () => {
  return request.get('/my/cate/list')
}

export const addChannelApi = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', { cate_name, cate_alias })
}

export const updateChannelApi = ({ cate_name, cate_alias, id }) => {
  return request.put('/my/cate/info', { cate_name, cate_alias, id })
}

export const delChannelApi = (id) => {
  return request.delete('/my/cate/del', { params: { id } })
}

export const getManageListApi = ({ pagenum, pagesize, cate_id, state }) => {
  return request.get('/my/article/list', {
    params: { pagenum, pagesize, cate_id, state },
  })
}

// formData 有 title,cate_id,content,cover_img,state 参数
export const addManageApi = (formData) => {
  return request.post('/my/article/add', formData)
}

export const getManageDrawerFormDataApi = (id) => {
  return request.get('/my/article/info', {
    params: {
      id,
    },
  })
}

// formData 有 id,title,cate_id,content,cover_img,state 参数
export const updateManageApi = (formData) => {
  return request.put('/my/article/info', formData)
}

export const deleteManageApi = (id) => {
  return request.delete('/my/article/info', {
    params: {
      id,
    },
  })
}
