import React, { useState, useEffect } from 'react'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Menu, Layout } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import logo from '@/assets/images/logo.png'
import { asyncRoutes } from '@/router/config'
import type { RouteProp } from '@/router/config'
const { Sider } = Layout

export type MenuItemProp = {
  label: string
  title: string
  key: string
  pkey: string
  path: string
  icon?: JSX.Element
  children?: MenuItemProp[]
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
  return menuItems[0]
}
const Sidebar: React.FC<any> = props => {
  const location = useLocation()
  const currentMenu = getCurrentMenu(location.pathname)
  const navigate = useNavigate()
  const { onCollapse } = props
  const [openKeys, setOpenKeys] = useState([currentMenu.pkey])
  const [collapsed, setCollapsed] = useState(false)
  const [current, setCurrent] = useState(currentMenu.key)
  const [sideWidth, setSideWidth] = useState(308)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  useEffect(() => {
    setSideWidth(collapsed ? 64 : 308)
  }, [collapsed])

  const onClick = (e: any) => {
    setCurrent(e.key)
    navigate(e.item.props.path)
  }
  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1) || ''
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  return (
    <>
      <div
        style={{
          width: sideWidth,
          overflow: 'hidden',
          flex: `0 0 ${sideWidth}px`,
          maxWidth: sideWidth,
          minWidth: sideWidth,
          transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`
        }}
      />
      <Sider
        collapsible
        collapsedWidth={64}
        trigger={null}
        collapsed={collapsed}
        onCollapse={collapse => {
          onCollapse?.(collapse)
        }}
        width={sideWidth}
        className={`${styles['custom-aside-fixed']} ${styles['custom-aside']}`}
      >
        <div className={`${collapsed && styles['custom-aside-cpllapsed']} ${styles['sider-wrap']}`}>
          <div className={styles['sider-logo']}>
            <img src={logo} alt='VGP' />
            {!collapsed && <h1>Versatile Graphics Processing</h1>}
          </div>
          <div className={styles['sider-main']}>
            <Menu
              inlineIndent={24}
              mode='inline'
              items={menuItems}
              onSelect={onClick}
              selectedKeys={[current]}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            />
          </div>
          <div className={styles['sider-links']} onClick={toggleCollapsed}>
            <div className={styles['sider-icon']}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
          </div>
        </div>
      </Sider>
    </>
  )
}
export default Sidebar
