import React from 'react'
import { Menu } from 'antd'
import { getImageUrl } from '@/utils'
import { useLocation, Link } from 'react-router-dom'
import style from './index.module.less'
type MenuIconType = [string, string]
const MenuComp: React.FC = () => {
  const location = useLocation()
  const pathname = location.pathname
  const moveIcon: MenuIconType = [getImageUrl('product/move.svg'), getImageUrl('product/move-hover.svg')]

  return (
    <Menu className={style.menu} collapsable theme='dark' title='大数据迁移工具'>
      {/* <Menu.Item
        title='概览'
        icon={cosDiffIcon}
        selected={pathname.startsWith('/all')}
        render={children => <Link to='/cosdiff'>{children}</Link>}
      /> */}
      {/* <Menu.Item
        title='函数服务'
        icon={cosDiffIcon}
        selected={pathname.startsWith('/service')}
        render={children => <Link to='/cosdiff'>{children}</Link>}
      /> */}
      <Menu.SubMenu icon={moveIcon} defaultOpened title='大数据迁移'>
        <Menu.Item
          title='HDFS迁移'
          selected={pathname.startsWith('/hdfs')}
          render={children => <Link to='/hdfs'>{children}</Link>}
        />
        <Menu.Item
          title='Hive迁移'
          selected={pathname.startsWith('/hive')}
          render={children => <Link to='/hive'>{children}</Link>}
        />
        <Menu.Item
          title='HBase迁移'
          selected={pathname.startsWith('/hbase')}
          render={children => <Link to='/hbase'>{children}</Link>}
        />
        <Menu.Item
          title='Kudu迁移'
          selected={pathname.startsWith('/kudu')}
          render={children => <Link to='/kudu'>{children}</Link>}
        />
      </Menu.SubMenu>
      {/* <Menu.Item
        title='对象存储比对工具'
        icon={cosDiffIcon}
        selected={!pathname || pathname === '/cosdiff'}
        render={children => <Link to='/cosdiff'>{children}</Link>}
      />
      <Menu.Item
        title='服务平台'
        icon={cosDiffIcon}
        selected={pathname.startsWith('/place')}
        render={children => <Link to='/cosdiff'>{children}</Link>}
      /> */}
    </Menu>
  )
}

export default MenuComp
