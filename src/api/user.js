import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v1/token/signin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/v1/user/detail',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
