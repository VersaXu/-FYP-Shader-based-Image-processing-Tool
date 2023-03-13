import React, { useState } from 'react'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu } from 'antd'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.module.less'
import { useUserStore } from '@/store/useUserStore'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [currentUser, setCurrentUser] = useState({
    email: 'Test Email',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001'
  })
  const { removeUser } = useUserStore()
  const onMenuClick = () => {
    console.log('sd')
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key='center'>
          <UserOutlined />
          Account Center
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key='logout' onClick={removeUser}>
        <LogoutOutlined />
        Sign out
      </Menu.Item>
    </Menu>
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size='small' className={styles.avatar} src={currentUser.avatar} alt='avatar' />
        <span className={`${styles.name} anticon`}>{currentUser.email}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
