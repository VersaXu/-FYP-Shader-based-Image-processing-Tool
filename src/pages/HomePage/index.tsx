import React from 'react'
import { Card, Carousel } from 'antd'
import styles from './index.module.less'
import { getImageUrl } from '@/utils'
import PageContainer from '@/components/PageContainer'

const HomePage: React.FC = () => {
  const banners = [
    {
      url: getImageUrl('banner.png'),
      title: '维鹰云智能运维',
      content: '通过AI和大数据技术助力数据中心运维，为业务连续保驾护航，让运维工作简单高效。'
    },
    {
      url: getImageUrl('banner1.png'),
      title: '腾讯伙伴',
      content: '腾讯云的战略合作伙伴，专注为腾讯云全线产品提供原厂技术支持服务。'
    },
    {
      url: getImageUrl('banner2.png'),
      title: '算法能力',
      content: '10+腾讯云认证的专业算法工程师自研核心算法支撑告警降噪，异常检测、容量预测等核心功能。'
    },
    {
      url: getImageUrl('banner3.png'),
      title: '运维经验',
      content: '1000+通过云计算专业认证的工程师，为超过3000+企业提供云计算运维服务。'
    }
  ]

  console.log('IMAGE url', banners)

  return (
    <PageContainer showBreadcrumb={false}>
      <Card>
        <Carousel effect='fade' autoplay autoplaySpeed={3000}>
          {banners.map((item, index) => (
            <div key={index} className={styles['swiper-item']} style={{ backgroundImage: `url(${item.url})` }}>
              <div>
                <div className={styles['title']}>{item.title}</div>
                <div className={styles['content']}>{item.content}</div>
              </div>
            </div>
          ))}
        </Carousel>
      </Card>
    </PageContainer>
  )
}
export default HomePage
