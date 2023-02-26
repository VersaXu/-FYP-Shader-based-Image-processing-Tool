import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router'
import { Layout } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import HeaderComp from './components/Header'
import Siderbar from './components/Siderbar'
import style from './Layout.module.less'
const { Content, Header, Footer } = Layout

interface Iprops {
  Element?: any
}
const LayoutComp: React.FC<Iprops> = props => {
  const location = useLocation()
  const BusinessContents = () => (
    <Layout className={style['root-layout']}>
      <Siderbar />
      <Layout className={style['content-layout']}>
        <HeaderComp />
        <Content className={style.content} style={{ overflow: 'initial' }}>
          {props.Element && <props.Element />}
        </Content>
        {/* Footer 不需要在额外进行组件化管理，使用默认提供 */}
        <Footer style={{ textAlign: 'center' }}>
          <p>Made with ❤ by</p>
          <p>
            Versatile GPU Processing Tool&nbsp;
            <a href='https://github.com/VersaXu/-FYP-Shader-based-Image-processing-Tool'>
              <GithubOutlined />
            </a>
            &nbsp; ©2023 Created by Versa Xu
          </p>
        </Footer>
      </Layout>
    </Layout>
  )
  return <Layout>{location.pathname === '/login' ? <props.Element /> : <BusinessContents />}</Layout>
}
export default LayoutComp
