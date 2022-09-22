import React from 'react'
import { Button, Card } from 'antd'
import styles from './index.module.less'
import PageContainer from '@/components/PageContainer'
const HomePage: React.FC = () => {
  return (
    <PageContainer showBreadcrumb={false}>
      <Card>
        首页
        <h1>这里要写一个功能展示界面</h1>
      </Card>
    </PageContainer>
  )
}
export default HomePage
