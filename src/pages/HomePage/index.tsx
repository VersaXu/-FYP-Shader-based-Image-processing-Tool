import React from 'react'
import { Button, Card, Carousel } from 'antd'
import styles from './index.module.less'
import PageContainer from '@/components/PageContainer'

const contentStyle = {
  height: '360px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#164d79'
}

const HomePage: React.FC = () => {
  return (
    <PageContainer showBreadcrumb={false}>
      <Card>
        <Carousel effect='fade' autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </Card>
    </PageContainer>
  )
}
export default HomePage
