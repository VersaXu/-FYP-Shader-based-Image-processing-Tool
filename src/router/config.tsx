import loadable from '@loadable/component'
import type { LoadableComponent } from '@loadable/component'
import React from 'react'
import {
  HomeOutlined,
  ClusterOutlined,
  BranchesOutlined,
  SettingOutlined,
  FormOutlined,
  ThunderboltOutlined,
  CloudOutlined
} from '@ant-design/icons'
export type RouteMetaProp = {
  title: string
  icon?: JSX.Element
}
export type RouteProp = {
  path: string
  redirect?: string
  name: string
  meta?: RouteMetaProp
  component?: LoadableComponent<React.FC>
  hideMenu?: boolean
  children?: RouteProp[]
}

export const asyncRoutes: RouteProp[] = [
  {
    path: '/',
    name: 'home',
    component: loadable(() => import('@/pages/HomePage')),
    meta: { title: 'Home Page', icon: <HomeOutlined /> }
  },
  {
    path: '/image-processing/',
    redirect: '/image-processing/single-image-upload',
    name: 'Image Processing',
    meta: { title: 'Image Processing', icon: <FormOutlined /> },
    children: [
      {
        path: 'single-image-upload',
        component: loadable(() => import('@/pages/ImageProcessing/SingleImageUpload')),
        name: 'SingleImageUpload',
        meta: { title: 'Single Image Upload' }
      },
      {
        path: 'multiple-images-upload',
        component: loadable(() => import('@/pages/ImageProcessing/MultipleImagesUpload')),
        name: 'MultipleImagesUpload',
        meta: { title: 'Multiple Images Upload' }
      },
      {
        path: 'image-set-upload',
        component: loadable(() => import('@/pages/ImageProcessing/ImageSetUpload')),
        name: 'ImageSetUpload',
        meta: { title: 'Image Set Upload' }
      },
      {
        path: 'processing-history',
        component: loadable(() => import('@/pages/ImageProcessing/ProcessingHistory')),
        name: 'ProcessingHistory',
        meta: { title: 'Processing History' }
      }
    ]
  },
  {
    path: '/gpu-setting/',
    redirect: '/gpu-setting/business-relationship',
    name: 'GPU Setting',
    meta: { title: 'GPU Setting', icon: <ThunderboltOutlined /> },
    children: [
      {
        path: 'business-relationship',
        component: loadable(() => import('@/pages/GPUSetting/BusinessRelationship')),
        name: 'BusinessRelationship',
        meta: { title: '业务关系' }
      },
      {
        path: 'business-config',
        component: loadable(() => import('@/pages/GPUSetting/BusinessConfig')),
        name: 'BusinessConfig',
        meta: { title: '业务配置' }
      },
      {
        path: 'business-dashboard',
        component: loadable(() => import('@/pages/GPUSetting/BusinessDashboard')),
        name: 'BusinessDashboard',
        meta: { title: '业务面板' }
      }
    ]
  },
  {
    path: '/alarm/',
    redirect: '/alarm/current-alarm',
    name: 'Alarm',
    meta: { title: 'Cloud Image Set', icon: <CloudOutlined /> },
    children: [
      {
        path: 'current-alarm',
        component: loadable(() => import('@/pages/alarm/CurrentAlarm')),
        name: 'CurrentAlarm',
        meta: { title: '当前告警' }
      },
      {
        path: 'history-alarm',
        component: loadable(() => import('@/pages/alarm/HistoryAlarm')),
        name: 'HistoryAlarm',
        meta: { title: '历史告警' }
      },
      {
        path: 'ignore-rules',
        component: loadable(() => import('@/pages/alarm/IgnoreRules')),
        name: 'IgnoreRules',
        meta: { title: '告警忽略规则' }
      },
      {
        path: 'alarm-push',
        component: loadable(() => import('@/pages/alarm/AlarmPush')),
        name: 'AlarmPush',
        meta: { title: '报警推送' }
      }
    ]
  },
  {
    path: '/cluster-grouping/',
    redirect: '/cluster-grouping/cluster-config',
    name: 'ClusterGrouping',
    meta: { title: 'System Comfiguration', icon: <ClusterOutlined /> },
    children: [
      {
        path: 'grouping-config',
        component: loadable(() => import('@/pages/ClusterGrouping/GroupingConfig')),
        name: 'GroupingConfig',
        meta: { title: '分组配置' }
      },
      {
        path: 'cluster-config',
        component: loadable(() => import('@/pages/ClusterGrouping/ClusterConfig')),
        name: 'ClusterConfig',
        meta: { title: '集群配置' }
      },
      {
        path: 'ab-relationship-config',
        component: loadable(() => import('@/pages/ClusterGrouping/ABRelationshipConfig')),
        name: 'ABRelationshipConfig',
        meta: { title: 'AB关系配置' }
      }
    ]
  },
  {
    path: '/alias/',
    redirect: '/alias/alias-config',
    name: 'Alias',
    meta: { title: 'Fork Management', icon: <BranchesOutlined /> },
    children: [
      {
        path: 'alias-config',
        component: loadable(() => import('@/pages/alias/AliasConfig')),
        name: 'AliasConfig',
        meta: { title: '别名配置' }
      },
      {
        path: 'net-segment-alias-config',
        component: loadable(() => import('@/pages/alias/NetSegmentAliasConfig')),
        name: 'NetSegmentAliasConfig',
        meta: { title: '网段别名配置' }
      }
    ]
  },
  {
    path: '/system-info/',
    redirect: '/system-info/version',
    name: 'SystemInfo',
    meta: { title: 'System Information', icon: <SettingOutlined /> },
    children: [
      {
        path: 'version',
        component: loadable(() => import('@/pages/SystemInfo/version')),
        name: 'SystemInfoVersion',
        meta: { title: '版本信息' }
      },
      {
        path: 'authorization',
        component: loadable(() => import('@/pages/SystemInfo/authorization')),
        name: 'SystemInfoAuthorization',
        meta: { title: '授权信息' }
      },
      {
        path: 'chrome',
        component: loadable(() => import('@/pages/SystemInfo/chrome')),
        name: 'SystemInfoChrome',
        meta: { title: 'chrome浏览器' }
      },
      {
        path: 'probe',
        component: loadable(() => import('@/pages/SystemInfo/probe')),
        name: 'SystemInfoProbe',
        meta: { title: '探针状态' }
      }
    ]
  }
]
