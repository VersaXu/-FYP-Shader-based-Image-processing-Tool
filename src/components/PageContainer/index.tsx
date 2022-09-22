import React from 'react'
import type { BreadcrumbProps } from 'antd'
import { PageHeader } from 'antd'
import styles from './index.module.less'
import useMenu from '@/hooks/useMenu'
import type { BreadcrumbRoute } from '@/hooks/useMenu'
import { Link } from 'react-router-dom'
export type PageContainerProps = {
  /**页面标题 */
  title?: string
  /**页面子标题 */
  subTitle?: string
  /**面包屑自定义配置 */
  breadcrumb?: BreadcrumbProps
  /**是否显示头部，默认显示 */
  showHeader?: boolean
  /**是否显示面包屑，默认显示 */
  showBreadcrumb?: boolean
  /**额外面包屑，比如页面详情等 */
  extraRoutes?: BreadcrumbRoute[]
}
const PageContainer: React.FC<PageContainerProps> = props => {
  const { defaultBreadcrumb, currentMenu } = useMenu()
  const {
    title = currentMenu.label || '页面标题',
    subTitle,
    children,
    breadcrumb = {},
    extraRoutes = [],
    showHeader = true,
    showBreadcrumb = true
  } = props

  // 配合路由history模式，修正路由跳转
  const itemRender = (route: BreadcrumbRoute) => {
    return <Link to={route.path}>{route.breadcrumbName}</Link>
  }
  let renderBreadcrumb: BreadcrumbProps | undefined
  if (showBreadcrumb) {
    renderBreadcrumb = {
      ...defaultBreadcrumb,
      routes: [...defaultBreadcrumb.routes, ...extraRoutes],
      itemRender,
      ...breadcrumb
    }
  }

  return (
    <div className={styles['page-container']}>
      {showHeader && (
        <div className={styles['page-header']}>
          <PageHeader className='site-page-header' title={title} breadcrumb={renderBreadcrumb} subTitle={subTitle} />
        </div>
      )}

      <div className={styles['page-main']}>{children}</div>
    </div>
  )
}

export default PageContainer
