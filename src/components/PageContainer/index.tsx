import React from 'react'
import type { BreadcrumbProps } from 'antd'
import { PageHeader } from 'antd'
import styles from './index.module.less'
export type PageContainerProps = {
  title?: string
  breadcrumb?: BreadcrumbProps
  showBreadcrumb?: boolean
}
const PageContainer: React.FC<PageContainerProps> = props => {
  const { title = '页面标题', children, breadcrumb, showBreadcrumb } = props
  const routes = [
    {
      path: '',
      breadcrumbName: '一级页面'
    },
    {
      path: '',
      breadcrumbName: '二级页面'
    },
    {
      path: '',
      breadcrumbName: '当前页面'
    }
  ]
  return (
    <div className={styles['page-container']}>
      <div className={styles['page-header']}>
        <PageHeader className='site-page-header' title={title} breadcrumb={{ routes }} subTitle='This is a subtitle' />
      </div>
      <div className={styles['page-main']}>{children}</div>
    </div>
  )
}

export default PageContainer
