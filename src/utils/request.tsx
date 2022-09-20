import qs from 'qs'
import { useContext } from 'react'
import { AppContext } from '@/store'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { message } from 'antd'

let passSameError = '' // 500ms内相同错误提示只显示一次,该参数为错误信息
let passSameErrorTimer = 0
// const BASE_API_PATH: string = config.BASE_API_PATH
const BASE_API_PATH: string = import.meta.env.VITE_API_BASE
// 默认配置30s
axios.defaults.timeout = 30000
// 普通请求用例
axios.defaults.withCredentials = true

const baseName = import.meta.env.VITE_ROUTER_BASE

// form-data类型请求用例
const requestForm = axios.create({
  baseURL: BASE_API_PATH,
  maxRedirects: 0,
  // 将数据转成form-data
  transformRequest: [
    function (data) {
      if (!data) {
        return data
      }
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object') {
          data[key] = JSON.stringify(data[key])
        }
      })
      return qs.stringify(data)
    }
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const request = axios.create({
  baseURL: BASE_API_PATH,
  headers: {
    'Content-Type': 'application/json'
  }
})

const requestDownload = axios.create({
  baseURL: BASE_API_PATH,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 拦截器成功回调
 * 所有接口返回0才正常返回resolve
 * 非0都reject出去
 * @param res
 * @returns {*}
 */
function resolve(res: AxiosResponse) {
  if (res.data.code == 401) {
    //todo:接口鉴权失败后回到登录页
    location.href = baseName + 'login'
  }
  return res.data
}

function downloadResolve(res: AxiosResponse) {
  return res
}

// 失败，一般是网络错误
function reject(error: AxiosError) {
  const { response, code } = error

  let errmsg = ''
  // 超时信息处理
  if (code === 'ECONNABORTED') {
    errmsg = '请求超时，请重新再试'
  }

  // 网络错误处理
  if (error.message.indexOf('Network Error') !== -1) {
    errmsg = '网络错误，请检查网络'
  }

  // 接口返回错误处理
  if (response) {
    const errorMap = {
      401: '您当前状态已失效，请重新登录',
      404: '请求接口404，请联系管理员',
      502: '客官稍安勿躁，我们的攻城狮正在紧急维护，请稍后重试',
      504: '网络请求超时，请检查您的网络或稍后重试'
    }
    !errmsg && (errmsg = errorMap[response.status] || '客官稍安勿躁，我们的攻城狮正在紧急维护，请稍后重试')

    // 如果是登录状态失效清空 userInfo
    if (response.status === 401) {
      const EmptyUserinfo = () => {
        const { dispatch } = useContext(AppContext)
        const navigate = useNavigate()
        dispatch({ type: 'LOGOUT' })
        navigate('/login')
      }
      EmptyUserinfo()
    }
  }

  if (errmsg) {
    //500ms内相同错误只显示一次
    if (passSameError !== errmsg) {
      clearTimeout(passSameErrorTimer)
      passSameError = errmsg
      passSameErrorTimer = window.setTimeout(() => {
        passSameError = ''
      }, 500)

      message.error({
        content: errmsg,
        duration: 3000
      })
    }
  }

  console.log('=====> error', error)
  console.log('=====> error.response', error.response)
  // 将所有返回放到then里，所有调用尽量使用await
  /**
   * 调用例子：
   *  const { success, desc, data } = await apipost()
   * if(success) {
   *    代码逻辑
   * } else {
   *    desc && this.$Message.error(desc)
   * }
   */

  return Promise.resolve({
    success: false,
    desc: null,
    data: null
  })
}

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const Authorization: any = localStorage.getItem('Authorization')
  config.headers = { ...config.headers, Authorization }
  return config
})

requestForm.interceptors.request.use((config: AxiosRequestConfig) => {
  const Authorization: any = localStorage.getItem('Authorization')
  config.headers = { ...config.headers, Authorization }
  return config
})

requestDownload.interceptors.request.use((config: AxiosRequestConfig) => {
  const Authorization: any = localStorage.getItem('Authorization')
  config.headers = { ...config.headers, Authorization }
  return config
})

request.interceptors.response.use(resolve, reject)
requestForm.interceptors.response.use(resolve, reject)
requestDownload.interceptors.response.use(downloadResolve, reject)
export { request, requestForm, requestDownload }
