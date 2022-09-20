import React from 'react'
import { Layout, Space } from 'antd'
import Avatar from './AvatarDropdown'
import styles from './index.module.less'
const { Header } = Layout
const HeaderComp = () => {
  return (
    <Header className={styles.header}>
      <div className={styles['global-header']}>
        <Space className={styles.right}>
          <Avatar menu />
        </Space>
      </div>
    </Header>
  )
}

export default HeaderComp
