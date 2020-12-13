import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/auth-center/auth/login',
    method: 'post',
    params: data
  })
}

export function logout() {
  return request({
    url: '/auth-center/auth/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/auth-center/auth/info',
    method: 'post',
    params: token
  })
}

export function registerNewUser(params) {
  return request({
    url: '/user-service/user/user',
    method: 'post',
    params: params
  })
}