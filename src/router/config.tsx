import loadable from '@loadable/component'
import type { LoadableComponent } from '@loadable/component'
import React from 'react'
import {
  HomeOutlined,
  ApartmentOutlined,
  AlertOutlined,
  ClusterOutlined,
  BranchesOutlined,
  SettingOutlined,
  DeploymentUnitOutlined,
  DownloadOutlined,
  CameraOutlined,
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
    redirect: '/dashboard',
    name: 'home',
    meta: { title: '首页', icon: <HomeOutlined /> },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        hideMenu: true,
        component: loadable(() => import('@/pages/dashboard')),
        meta: { title: 'Dashboard' }
      }
    ]
  },
  {
    path: '/index-search/',
    redirect: '/index-search/package',
    name: 'IndexSearch',
    meta: { title: '图像编辑', icon: <FormOutlined /> },
    children: [
      {
        path: 'total-package',
        component: loadable(() => import('@/pages/IndexSearch/TotalPackage')),
        name: 'TotalPackage',
        meta: { title: '总包速率' }
      },
      {
        path: 'total-traffic',
        component: loadable(() => import('@/pages/IndexSearch/TotalTraffic')),
        name: 'TotalTraffic',
        meta: { title: '总流量速率' }
      },
      {
        path: 'regular-stat-tcp',
        component: loadable(() => import('@/pages/IndexSearch/RegularStatTCP')),
        name: 'RegularStatTCP',
        meta: { title: '指标定期统计值TCP' }
      },
      {
        path: 'real-time-stat-tcp',
        component: loadable(() => import('@/pages/IndexSearch/RealTimeStatTCP')),
        name: 'RealTimeStatTCP',
        meta: { title: '指标实时统计值TCP' }
      },
      {
        path: 'real-time-value-tcp',
        component: loadable(() => import('@/pages/IndexSearch/RealTimeValueTCP')),
        name: 'RealTimeValueTCP',
        meta: { title: '指标实时值TCP' }
      },
      {
        path: 'snapshot-comparison-tcp',
        component: loadable(() => import('@/pages/IndexSearch/SnapshotComparisonTCP')),
        name: 'SnapshotComparisonTCP',
        meta: { title: '快照比对TCP' }
      }
    ]
  },
  {
    path: '/topology/',
    redirect: '/topology/business-relationship',
    name: 'Topology',
    meta: { title: 'GPU 设置', icon: <ThunderboltOutlined /> },
    children: [
      {
        path: 'business-relationship',
        component: loadable(() => import('@/pages/topology/BusinessRelationship')),
        name: 'BusinessRelationship',
        meta: { title: '业务关系' }
      },
      {
        path: 'business-config',
        component: loadable(() => import('@/pages/topology/BusinessConfig')),
        name: 'BusinessConfig',
        meta: { title: '业务配置' }
      },
      {
        path: 'business-dashboard',
        component: loadable(() => import('@/pages/topology/BusinessDashboard')),
        name: 'BusinessDashboard',
        meta: { title: '业务面板' }
      }
    ]
  },
  {
    path: '/alarm/',
    redirect: '/alarm/current-alarm',
    name: 'Alarm',
    meta: { title: '云端图库', icon: <CloudOutlined /> },
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
    meta: { title: '集群配置', icon: <ClusterOutlined /> },
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
    meta: { title: '别名管理', icon: <BranchesOutlined /> },
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
    path: '/load-balance/',
    redirect: '/load-balance/f5-info-config',
    name: 'LoadBalance',
    meta: { title: '负载均衡', icon: <DeploymentUnitOutlined /> },
    children: [
      {
        path: 'f5-info-config',
        component: loadable(() => import('@/pages/LoadBalance/F5InfoConfig')),
        name: 'F5InfoConfig',
        meta: { title: 'F5配置信息' }
      }
    ]
  },
  {
    path: '/system-info/',
    redirect: '/system-info/version',
    name: 'SystemInfo',
    meta: { title: '系统信息', icon: <SettingOutlined /> },
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
