import request from '@/utils/request'

// 用户注册
// const register = ({ username, phone, password }) => request.post('auth/register', { username, phone, password })

// 用户登录
// const login = ({ phone, password }) => request.post('auth/login', { phone, password })
const sendSms = ({ phone }) => request.get('/user-service/user/sms?phone=' + phone)

// 获取用户信息
// const info = () => request.get('auth/info')

export default {
  // register,
  // login,
  // info,
  sendSms
}
