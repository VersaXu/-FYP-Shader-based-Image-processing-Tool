import React from 'react'
import { useLocation } from 'react-router-dom'
import { asyncRoutes } from '@/router/config'
import type { RouteProp } from '@/router/config'
export type MenuItemProp = {
  label: string
  title: string
  key: string
  pkey: string
  path: string
  icon?: JSX.Element
  children?: MenuItemProp[]
}
export type BreadcrumbRoute = {
  path: string
  breadcrumbName: string
}
/**
 * 将路由配置转化为菜单
 * @param routes 路由
 * @returns MenuItemProp
 */
const formatRoute2Menu = (routes: RouteProp[], parentPath = '', pkey = ''): MenuItemProp[] => {
  return routes
    .filter(route => !route.hideMenu)
    .map(route => {
      const { path, meta, name, redirect, children } = route
      const subPath = redirect ? path : parentPath + path
      const menu: MenuItemProp = {
        label: meta?.title || '',
        title: meta?.title || '',
        key: name,
        icon: meta?.icon,
        path: subPath,
        pkey
      }
      if (Array.isArray(children) && children[0]) {
        const subMenus = formatRoute2Menu(children, subPath, name)
        if (subMenus[0]) {
          menu.children = subMenus
        }
      }
      return menu
    })
}
const menuItems = formatRoute2Menu(asyncRoutes)
const rootSubmenuKeys = menuItems.map(menu => menu.key)
const getCurrentMenu = (path: string): MenuItemProp => {
  let stack = [...menuItems]
  while (stack.length) {
    const cur = stack.pop()
    if (cur?.path === path) {
      return cur
    }
    if (cur?.children) {
      stack = [...stack, ...cur.children]
    }
  }
  return {} as MenuItemProp
}

const useMenu = () => {
  const location = useLocation()
  const currentMenu = getCurrentMenu(location.pathname)
  const generateBreadcrumbRoutes = () => {
    const routes: BreadcrumbRoute[] = [
      {
        path: '/',
        breadcrumbName: 'Home'
      }
    ]
    const stack = [...menuItems]
    const urlPath = location.pathname
    while (stack.length) {
      const cur = stack.pop() || ({} as MenuItemProp)
      const { path, label } = cur
      if (path === urlPath) {
        routes.push({
          path,
          breadcrumbName: label
        })
        break
      }
      if (urlPath !== '/' && urlPath.includes(path) && cur.children) {
        routes.push({
          path,
          breadcrumbName: label
        })
        stack.push(...cur.children)
      }
    }
    return routes
  }
  const defaultBreadcrumb = {
    routes: generateBreadcrumbRoutes()
  }
  return {
    menuItems,
    currentMenu,
    rootSubmenuKeys,
    defaultBreadcrumb
  }
}
export default useMenu
