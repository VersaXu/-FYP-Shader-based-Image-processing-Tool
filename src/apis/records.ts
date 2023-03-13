import { request } from '@/utils/request'

export type RecordParams = {
  id?: number
  type: string
  date: string
  original_img: string[]
  result_img: string[]
}

/**
 * 上传新记录
 * @param params RecordParams
 * @returns
 */
export const apiAddRecord = (params: RecordParams) => {
  return request({
    url: '/Record/add',
    method: 'POST',
    params,
    data: params
  })
}

/**
 * 删除所选记录
 * @param idList number[]
 * @returns
 */
export const apiDeleteRecord = (idList: number[]) => {
  return request({
    url: '/Record/delete',
    method: 'POST',
    data: { idList }
  })
}
