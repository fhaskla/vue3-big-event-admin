import request from '@/utils/request.js'

export function registerApi({ username, password, repassword }) {
  return request.post('/api/reg', {
    username,
    password,
    repassword,
  })
}

export function loginApi({ username, password }) {
  return request.post('/api/login', {
    username,
    password,
  })
}

export function userInfoApi() {
  return request.get('/my/userinfo')
}

export function updateUserInfoApi({ id, username, nickname, email, user_pic }) {
  return request.put('/my/userinfo', {
    id,
    username,
    nickname,
    email,
    user_pic,
  })
}

export function updateAvatarApi(avatar) {
  return request.patch('/my/update/avatar', {
    avatar,
  })
}

export function updatePasswordApi({ old_pwd, new_pwd, re_pwd }) {
  return request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd,
  })
}
