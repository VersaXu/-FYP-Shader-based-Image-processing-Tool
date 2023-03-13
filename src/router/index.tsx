import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { asyncRoutes } from './config'
import { isExternal } from '@/utils/validate'
import loadable from '@loadable/component'
// 懒加载
const Login = loadable(() => import('@/pages/user/login'))
const resolvePath = (uPath: string, routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(uPath)) {
    return uPath
  }
  return uPath + routePath
}
// 路由数组
const routeArr: any = []
const renderRouterFunc = (asyncRouter: any, uPath: any) => {
  for (const item of asyncRouter) {
    if (item.children) {
      item.children.forEach((fItem: any) => {
        routeArr.push(
          <Route path={resolvePath(item.path, fItem.path)} element={<fItem.component />} key={fItem.path} />
        )
        if (fItem.children) {
          renderRouterFunc(fItem.children, resolvePath(item.path, fItem.path))
        }
      })
    } else {
      routeArr.push(<Route element={<item.component />} key={item.path} path={resolvePath(uPath, item.path)} />)
    }
    if (item.redirect) {
      routeArr.push(<Route path={item.path} key={item.path} element={<Navigate to={item.redirect} replace />} />)
    }
  }
}
renderRouterFunc(asyncRoutes, '/')
const RouterPages: React.FC = () => {
  return (
    <Routes>
      {routeArr}
      <Route path='/login' element={<Login />} key='login' />
      <Route path='*' element={<Navigate to='/home' replace />} />
    </Routes>
  )
}
export default RouterPages
