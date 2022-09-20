import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router'
import { Layout } from 'antd'
import HeaderComp from './components/Header'
import Siderbar from './components/Siderbar'
import style from './Layout.module.less'
const { Content, Header } = Layout

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
        <Content className={style.content}>{props.Element && <props.Element />}</Content>
      </Layout>
    </Layout>
  )
  return <Layout>{location.pathname === '/login' ? <props.Element /> : <BusinessContents />}</Layout>
}
export default LayoutComp
