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

const registerNewUser = ({ username, password, vcode, phone }) => request.post('/user-service/user/user', {
  username,
  password,
  vcode,
  phone
})

export function sendSms(params) {
  return request({
    url: '/user-service/user/sms',
    method: 'get',
    params: params
  })
}

export default {
  registerNewUser
}
