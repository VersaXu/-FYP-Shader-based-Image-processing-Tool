import React from 'react'
import { Layout } from 'antd'
const { Sider } = Layout
import MenuComp from '../menu'
const SiderComp: React.FC = () => {
  return (
    <Sider>
      <MenuComp />
    </Sider>
  )
}

export default SiderComp
