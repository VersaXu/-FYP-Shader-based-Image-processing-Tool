import React, { useState } from 'react'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu } from 'antd'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.module.less'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [currentUser, setCurrentUser] = useState({
    name: '测试',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001'
  })
  const onMenuClick = () => {
    console.log('sd')
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key='center'>
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key='logout'>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size='small' className={styles.avatar} src={currentUser.avatar} alt='avatar' />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
