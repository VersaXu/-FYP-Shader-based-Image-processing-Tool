import { request } from '@/utils/request'

export function apiTest() {
  return request({
    url: '/test'
  })
}
