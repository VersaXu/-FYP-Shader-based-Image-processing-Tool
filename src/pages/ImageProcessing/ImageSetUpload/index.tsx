import React, { useState } from 'react'
import { DownOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Modal, Upload, Card, Button, message, Dropdown, Menu, Typography } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import PageContainer from '@/components/PageContainer'
import fs from 'fs'

const ImageSetUpload: React.FC = () => {
  // const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg']
  const [dirList, setDirList] = useState<UploadFile[]>([])

  // big size directory or multiple image set upload, to limit the format of the images from the chosen directory

  // 文件上传函数
  const handleDirectoryUpload = (event: any) => {
    if (!event.target.files) {
      console.log('FILES not exist!')

      return
    }
    const directory = event.target.files[0]
    console.log('TEST directory files: ' + directory)

    fs.readdir(directory.path, (err, files) => {
      if (err) {
        console.error(err)
      } else {
        const newDirList: any[] = [...dirList]

        files.forEach((file, index) => {
          const dirFileUrl = `${directory.path}/${file}`
          console.log('test dir url' + dirFileUrl)

          newDirList.push({
            uid: index,
            name: file,
            status: 'done',
            url: dirFileUrl
          })
        })

        setDirList(newDirList)
        console.log('TEST DIR:' + dirList.values)
      }
    })
  }

  // 下拉列表列表选择存储
  const [selectedKey, setSelectedKey] = useState('1')

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    console.log(e.key)

    setSelectedKey(e.key)
    console.log('Selected Successfully! The previous selected key is: ' + selectedKey)
  }
  return (
    <>
      <PageContainer>
        <Card>
          <Card>
            <h1>Upload Image Set</h1>
            <br />
            <Upload directory onChange={handleDirectoryUpload}>
              <Button icon={<UploadOutlined />}>Upload Directory</Button>
            </Upload>
            <br />
            <br />
            <br />
            <br />
            {/* 下拉列表选择算法 */}
            <Dropdown
              overlay={
                <Menu onClick={handleMenuClick} itemID={selectedKey} selectable>
                  <Menu.Item
                    key='1'
                    // onClick={handleClick}
                  >
                    Item 1
                  </Menu.Item>
                  <Menu.Item
                    key='2'
                    // onClick={handleClick}
                  >
                    Item 2
                  </Menu.Item>
                  <Menu.Item
                    key='3'
                    // onClick={handleClick}
                  >
                    Item 3
                  </Menu.Item>
                </Menu>
              }
            >
              <Typography.Link>
                Hover me to select algorithm <DownOutlined />
              </Typography.Link>
            </Dropdown>
          </Card>
        </Card>
      </PageContainer>
    </>
  )
}

export default ImageSetUpload
