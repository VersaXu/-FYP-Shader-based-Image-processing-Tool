import { Alert, Button, Card, Table, Popconfirm, Dropdown, MenuProps, message, Menu, ConfigProvider } from 'antd'
import { DownOutlined, ClusterOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/lib/table'
// import { ClusterSrcConfigParams, ClusterSrcAdditionParams } from '@/apis/types'
import zhCN from 'antd/lib/locale/zh_CN'
// import { DestNodesType, DestNodeType, SrcNodesType } from '../components/types'
import React, { useEffect, useState } from 'react'
import PageContainer from '@/components/PageContainer'
// import NewClusterModal from './components/CreateCluster/NewClusterModal'
// import MutipleDeleteConfirm from './components/DeleteCluster/MutipleDeleteConfirm'
import styles from './index.module.less'
// import { apiGetClusterConfig, apiDeleteClusters } from '@/apis/cluster'
// import EditClusterModal from './components/EditCluster/EditClusterModal'
// import FilterContent from '@/components/FilterContent'

// 示例
const handleMenuClick: MenuProps['onClick'] = e => {
  message.info('Click on menu item.')
  console.log('click', e)
}

const menu = (
  <Menu
    onClick={handleMenuClick}
    items={[
      {
        label: 'F5 集群',
        key: '1',
        icon: <ClusterOutlined />
      },
      {
        label: '自定义集群',
        key: '2',
        icon: <ClusterOutlined />
      },
      {
        label: '所有',
        key: '3',
        icon: <ClusterOutlined />
      }
    ]}
  />
)

// 搜索缓存
// let cacheData: ClusterSrcAdditionParams[] = []

const ProcessingHistory: React.FC = () => {
  const columns: ColumnsType<any> = [
    {
      title: 'Process Name',
      dataIndex: 'name',
      width: 130
    },
    {
      title: 'description',
      dataIndex: 'comment',
      width: 240
    },
    {
      title: 'Upload Type',
      dataIndex: 'type',
      width: 130
    },
    {
      title: 'Images Info',
      dataIndex: 'images',
      width: 240,
      // 这里是去了第一个字段的ip和端口，没有渲染所有的
      render: (value: any[]) => {
        let res = ''
        value.forEach((item, index) => {
          res = res + item.ip + ':' + item.port
          if (index !== value.length - 1) res += ','
        })
        return res
      }
    },
    {
      title: 'Last Update',
      dataIndex: 'updateTime',
      width: 200,
      sorter: (a, b) => {
        console.log('object', a, b)
        const aTime = new Date(a.updateTime as string).getTime()
        const bTime = new Date(b.updateTime as string).getTime()
        return aTime - bTime
      }
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (
        _,
        record: {
          name: string
          comment: string
          type: string
          images: any[]
        }
      ) => {
        console.log('record: ', record)
        return [
          dataSource.length >= 1 ? (
            <>
              {/* <EditClusterModal updateItem={record} getData={getClusterConfigData} /> */}
              {/* <Popconfirm title='确认删除该记录？这将不可恢复' onConfirm={() => handleSingleDelete(record.name)}>
                <a className={styles['border-left-divider']}>&nbsp;&nbsp;删除</a>
              </Popconfirm> */}
            </>
          ) : null
        ]
      }
    }
  ]

  // 表格分页样式
  const [pageOption, setPageOption] = useState({
    pageNo: 1,
    pageSize: 10
  })

  // const getClusterConfigData = async () => {
  //   const res: any = await apiGetClusterConfig()
  //   console.log('当前getClusterConfigData 接收数据： ', res.data)

  //   if (res.success) {
  //     console.log('成功导入D,S集群配置至数据源: ', res.data)
  //     // 这里我们要把scluster的数据修饰成和dcluster一样的结构
  //     const { srcClusters } = res.data
  //     const srcRenderedArr: any[] = []
  //     srcClusters.forEach((element: any) => {
  //       const { name, comment, srcNodes, desNodes, updateTime } = element
  //       const srcNodeStr = srcNodes.map(item => item.nodes).join(',')
  //       const desNodeStr = desNodes.map(item => item.nodes).join(',')

  //       srcRenderedArr.push({
  //         name: name,
  //         type: 'SrcCluster',
  //         comment: comment,
  //         nodes: [
  //           {
  //             ip: 'source node:' + srcNodeStr + '  | desnition node: ' + desNodeStr,
  //             port: -1,
  //             type: '',
  //             comment: ''
  //           }
  //         ],
  //         srcNodes: srcNodes,
  //         desNodes: desNodes,
  //         updateTime: updateTime
  //       })
  //     })
  //     // 合并为同一个array
  //     const newClusterSource: any[] = [...srcRenderedArr, ...res.data.destClusters]

  //     setDataSource(newClusterSource)
  //     // cacheData = newClusterSource
  //   }
  // }

  // 标记所选items
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  // 获取及改变数据
  const [dataSource, setDataSource] = useState<any[]>([])

  // // 同步监听
  // useEffect(() => {
  //   getClusterConfigData()
  // }, [pageOption])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 0

  // const handleSingleDelete = async (name: string) => {
  //   const { success, message: desc, data } = await apiDeleteClusters([name])
  //   console.log('调完删除接口后返回的data:', data)

  //   if (success) {
  //     getClusterConfigData()
  //     console.log('SUCCESS: ', success)
  //   } else {
  //     desc && message.error(desc)
  //   }
  // }

  // const handleMultipleDelete = async (names: React.Key[]) => {
  //   const { success, message: desc } = await apiDeleteClusters(names as string[])
  //   if (success) {
  //     getClusterConfigData()
  //     message.success('删除成功', 3)
  //     // console.log('多项删除成功？', success)
  //   } else {
  //     desc && message.error(desc)
  //   }
  // }

  // /**
  //  * 关键字查找（前端实现）
  //  * @param value
  //  */
  // const handleSearch = (value = '') => {
  //   const keyword = value.toLowerCase()
  //   const filterData = cacheData.filter(item => {
  //     const recordStr = Object.values(item).join('').toLowerCase()
  //     return recordStr.includes(keyword)
  //   })
  //   setDataSource(filterData)
  // }

  const paginationProps = {
    current: pageOption.pageNo,
    pageSize: pageOption.pageSize,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '15', '20'],
    onChange: (current: number, pageSize: number) => {
      console.log('Page: ', current, '- size: ', pageSize)
      setPageOption({
        pageNo: current,
        pageSize: pageSize
      })
    }
  }

  return (
    <PageContainer>
      <Alert
        className={styles['alert-message']}
        description=' D集群说明：某些应用的Server端由多个IP:Port共同提供服务，这些IP:Port的组合视为一个D集群(Destination Cluster)，
        配置D集群有利于提升监控告警的准确性。也支持不指定端口，由多个IP地址组成的D集群，此时将统计所有发往这组IP的请求与响应的情况。
        由IP:Port组成的集群称为D1Cluster，由IP地址组成的D集群称为D2Cluster。
        S集群说明：某些应用系统，被多个源IP地址访问，这些源IP可以属于不同的分支机构、或来自不同的地区，可以按一定的规则，把这些源IP进行分组聚合，
        即为S集群（Source Cluster）。同时对这些分组指定它访问的目标IP:Port；如果这些源IP分组同时访问多个目标IP:Port，可把这些目标IP:Port配置成D集群，
        再指定源IP分组访问该D集群。'
        type='warning'
        showIcon
        banner
        closable
      />
      <Card>
        <div className={styles['content-top']}>
          <div className={styles['button-list']}>
            {/* <NewClusterModal getData={getClusterConfigData} /> */}
            <Button type='ghost'>导出CSV</Button>
            {/* <MutipleDeleteConfirm onDelete={() => handleMultipleDelete(selectedRowKeys)} selected={!hasSelected} /> */}
          </div>
          <div className={styles['topright-filter-list']}>
            <div className={styles['dropdown-btn']}>
              <Dropdown overlay={menu}>
                <Button>
                  集群种类
                  <DownOutlined style={{ float: 'right', marginTop: '5px' }} />
                </Button>
              </Dropdown>
            </div>
            <div>{/* <FilterContent onSearch={handleSearch} /> */}</div>
          </div>
        </div>
        <ConfigProvider locale={zhCN}>
          <Table
            rowKey='name'
            rowSelection={rowSelection}
            scroll={{ y: 'calc(100vh - 410px)' }}
            columns={columns}
            dataSource={dataSource}
            pagination={paginationProps}
          />
        </ConfigProvider>
      </Card>
    </PageContainer>
  )
}

export default ProcessingHistory
