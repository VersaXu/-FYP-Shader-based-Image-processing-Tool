import { requestForm } from '@/utils/request'

export type LoginParams = {
  emaik: string
  password: string
}

/**
 * 登录接口
 * @param params LoginParams
 * @returns
 */
export const apiLogin = (params: LoginParams) => {
  return requestForm({
    url: '/login',
    method: 'POST',
    params,
    data: params,
    headers: {
      email: params.email
    }
  })
}

/**
 * 获取服务器最新时间
 * @param params
 * @returns
 */
export const apiGetServerLastTime = (params: any) => {
  return requestForm({
    url: '/getLasTime',
    method: 'get',
    params
  })
}
