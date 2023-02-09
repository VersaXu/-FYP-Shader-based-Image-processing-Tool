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
  // {
  //   path: '/',
  //   redirect: '/dashboard',
  //   name: 'home',
  //   meta: { title: 'home', icon: <HomeOutlined /> },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       hideMenu: true,
  //       component: loadable(() => import('@/pages/dashboard')),
  //       meta: { title: 'home' }
  //     }
  //   ]
  // },
  {
    path: '/',
    name: 'home',
    component: loadable(() => import('@/pages/dashboard')),
    meta: { title: 'Home Page', icon: <HomeOutlined /> }
  },
  {
    path: '/image-processing/',
    redirect: '/image-processing/package',
    name: 'ImageProcessing',
    meta: { title: 'Image Processing', icon: <FormOutlined /> },
    children: [
      {
        path: 'image-upload',
        component: loadable(() => import('@/pages/ImageProcessing/ImageUpload')),
        name: 'ImageUpload',
        meta: { title: 'Image Processing' }
      },
      {
        path: 'total-traffic',
        component: loadable(() => import('@/pages/ImageProcessing/TotalTraffic')),
        name: 'TotalTraffic',
        meta: { title: 'Sample Page' }
      },
      {
        path: 'regular-stat-tcp',
        component: loadable(() => import('@/pages/ImageProcessing/RegularStatTCP')),
        name: 'RegularStatTCP',
        meta: { title: 'Sample Page' }
      },
      {
        path: 'real-time-stat-tcp',
        component: loadable(() => import('@/pages/ImageProcessing/RealTimeStatTCP')),
        name: 'RealTimeStatTCP',
        meta: { title: 'Sample Page' }
      },
      {
        path: 'real-time-value-tcp',
        component: loadable(() => import('@/pages/ImageProcessing/RealTimeValueTCP')),
        name: 'RealTimeValueTCP',
        meta: { title: 'Sample Page' }
      },
      {
        path: 'snapshot-comparison-tcp',
        component: loadable(() => import('@/pages/ImageProcessing/SnapshotComparisonTCP')),
        name: 'SnapshotComparisonTCP',
        meta: { title: 'Sample Page' }
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
