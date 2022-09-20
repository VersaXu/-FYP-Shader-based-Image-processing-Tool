import React, { useContext, useState } from 'react'
import { AppContext } from '@/store'
import { Menu, List, message } from 'antd'
import { apilogOut } from '@/apis/login'
import logo from '../../assets/images/favicon.ico'
import { useNavigate } from 'react-router'

const Header: React.FC = () => {
  const { dispatch, state } = useContext(AppContext)

  // 控制弹窗显示
  const [isShow, setShow] = useState<boolean>(false)

  const navigate = useNavigate()
  const logOut = async () => {
    const { code }: any = await apilogOut()
    if (code === 200) {
      //清除登录记录
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    } else {
      message.error({
        content: '退出登录失败'
      })
    }
  }
  return (
    <>
      <Menu
        left={
          <>
            <Menu.Item type='logo'>
              <img src={logo} alt='logo' />
            </Menu.Item>
            {/* <Menu.Item>总览</Menu.Item>
          <Menu.Item selected>云服务器</Menu.Item> */}
          </>
        }
        right={
          <>
            <Menu.Item
              type='dropdown'
              overlay={close => (
                <List type='option'>
                  <List.Item
                    onClick={() => {
                      setShow(true)
                      close()
                    }}
                  >
                    修改密码
                  </List.Item>
                  {/* <List.Item className='tea-nav__list-line' onClick={close}>
                  安全设置
                </List.Item> */}
                  <List.Item
                    onClick={() => {
                      close()
                      logOut()
                    }}
                  >
                    退出
                  </List.Item>
                </List>
              )}
            >
              {state.userinfo?.userName || '用户名'}
            </Menu.Item>
          </>
        }
      />
      {isShow && <Secret isShow={isShow} setShow={setShow} />}
    </>
  )
}
export default Header
