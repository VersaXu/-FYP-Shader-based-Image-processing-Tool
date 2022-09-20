import mockjs from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/table',
    method: 'get',
    response: ({ pageIndex = 1, pageSize = 10 } = {}) => {
      return {}
    }
  }
] as MockMethod[]
