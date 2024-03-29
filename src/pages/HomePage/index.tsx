import React from 'react'
import { Card, Carousel } from 'antd'
import styles from './index.module.less'
import { getImageUrl } from '@/utils'
import PageContainer from '@/components/PageContainer'

const HomePage: React.FC = () => {
  // 轮播图
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
  // 流程列表
  const processList = [
    {
      title: 'CMDB',
      desc: 'IT软硬件一站式管理',
      img: getImageUrl('pro_CMDB.png')
    },
    {
      title: '天巡',
      desc: '统一监控巡检',
      img: getImageUrl('pro_tianxun.png')
    },
    {
      title: '应用行为分析',
      desc: '应用异常发现与根因定位',
      img: getImageUrl('pro_app analysis.png')
    },
    {
      title: '智能事件平台',
      desc: '告警智能降噪与统计管理',
      img: getImageUrl('pro_intelligent event platform.png')
    }
  ]

  console.log('IMAGE url', banners)

  return (
    <PageContainer showBreadcrumb={false}>
      <Card>
        <Carousel effect='fade' autoplay autoplaySpeed={3000}>
          {banners.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  backgroundImage: `url(${item.url})`
                }}
                className={styles['swiper-item']}
              >
                <div>
                  <div className={styles['banner-title']}>{item.title}</div>
                  <div className={styles['content']}>{item.content}</div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Card>
      {/* 操作流程图展示 */}
      <Card>
        <h1 className={styles['title']}>一站式运维管理解决方案</h1>

        <div className={styles['process-box']}>
          {processList.map((item, index) => (
            <section key={item.title}>
              <div>
                <img src={item.img} alt={item.title} />
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.desc}</p>
                </div>
              </div>
              {/* 最后一个不渲染 */}
              {processList.length - 1 != index ? (
                <>
                  <br />
                  <div>
                    <img className={styles['arrow']} src={getImageUrl('arrow.png')} alt='arrow' />
                  </div>
                </>
              ) : (
                <></>
              )}
            </section>
          ))}
        </div>
      </Card>
    </PageContainer>
  )
}
export default HomePage
